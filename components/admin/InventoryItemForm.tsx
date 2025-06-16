'use client';

import { useState } from 'react';
import { InventoryItem } from '@/types/product';
import { categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Package } from 'lucide-react';

interface InventoryItemFormProps {
  item?: InventoryItem;
  onClose: () => void;
}

export default function InventoryItemForm({ item, onClose }: InventoryItemFormProps) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    sku: item?.sku || '',
    category: item?.category || '',
    currentStock: item?.currentStock?.toString() || '',
    minStock: item?.minStock?.toString() || '10',
    maxStock: item?.maxStock?.toString() || '100',
    reorderPoint: item?.reorderPoint?.toString() || '15',
    unitCost: item?.unitCost?.toString() || '',
    supplier: item?.supplier || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.currentStock || parseInt(formData.currentStock) < 0) {
      newErrors.currentStock = 'Valid current stock is required';
    }

    if (!formData.minStock || parseInt(formData.minStock) < 0) {
      newErrors.minStock = 'Valid minimum stock is required';
    }

    if (!formData.maxStock || parseInt(formData.maxStock) <= parseInt(formData.minStock)) {
      newErrors.maxStock = 'Maximum stock must be greater than minimum stock';
    }

    if (!formData.reorderPoint || parseInt(formData.reorderPoint) < 0) {
      newErrors.reorderPoint = 'Valid reorder point is required';
    }

    if (!formData.unitCost || parseFloat(formData.unitCost) <= 0) {
      newErrors.unitCost = 'Valid unit cost is required';
    }

    if (!formData.supplier.trim()) {
      newErrors.supplier = 'Supplier is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const currentStock = parseInt(formData.currentStock);
    const minStock = parseInt(formData.minStock);
    const maxStock = parseInt(formData.maxStock);
    const unitCost = parseFloat(formData.unitCost);

    // Determine status based on stock levels
    let status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstocked';
    if (currentStock === 0) {
      status = 'out-of-stock';
    } else if (currentStock < minStock) {
      status = 'low-stock';
    } else if (currentStock > maxStock * 0.9) {
      status = 'overstocked';
    } else {
      status = 'in-stock';
    }

    const inventoryData = {
      ...formData,
      id: item?.id || Math.random().toString(36).substr(2, 9),
      currentStock,
      minStock,
      maxStock,
      reorderPoint: parseInt(formData.reorderPoint),
      unitCost,
      totalValue: currentStock * unitCost,
      lastRestocked: item?.lastRestocked || new Date().toISOString().split('T')[0],
      status
    };

    // In a real app, this would make an API call
    console.log('Saving inventory item:', inventoryData);
    alert(item ? 'Inventory item updated successfully!' : 'Inventory item created successfully!');
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const generateSKU = () => {
    const prefix = formData.category ? formData.category.substring(0, 3).toUpperCase() : 'SKU';
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    const sku = `${prefix}-${random}`;
    handleInputChange('sku', sku);
  };

  const calculateTotalValue = () => {
    const stock = parseInt(formData.currentStock) || 0;
    const cost = parseFloat(formData.unitCost) || 0;
    return (stock * cost).toFixed(2);
  };

  const getStatusBadge = () => {
    const currentStock = parseInt(formData.currentStock) || 0;
    const minStock = parseInt(formData.minStock) || 0;
    const maxStock = parseInt(formData.maxStock) || 0;

    let status = 'in-stock';
    let className = 'bg-green-100 text-green-800';

    if (currentStock === 0) {
      status = 'out-of-stock';
      className = 'bg-red-100 text-red-800';
    } else if (currentStock < minStock) {
      status = 'low-stock';
      className = 'bg-yellow-100 text-yellow-800';
    } else if (currentStock > maxStock * 0.9) {
      status = 'overstocked';
      className = 'bg-blue-100 text-blue-800';
    }

    return (
      <Badge className={className}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Information
          </h3>
          
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="sku">SKU *</Label>
            <div className="flex gap-2">
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="SKU-123456"
                className={errors.sku ? 'border-red-500' : ''}
              />
              <Button type="button" variant="outline" onClick={generateSKU}>
                Generate
              </Button>
            </div>
            {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange('category', value)}
            >
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <Label htmlFor="supplier">Supplier *</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => handleInputChange('supplier', e.target.value)}
              placeholder="Supplier name"
              className={errors.supplier ? 'border-red-500' : ''}
            />
            {errors.supplier && <p className="text-red-500 text-sm mt-1">{errors.supplier}</p>}
          </div>
        </div>

        {/* Stock & Pricing */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Stock & Pricing
          </h3>
          
          <div>
            <Label htmlFor="currentStock">Current Stock *</Label>
            <Input
              id="currentStock"
              type="number"
              value={formData.currentStock}
              onChange={(e) => handleInputChange('currentStock', e.target.value)}
              min="0"
              className={errors.currentStock ? 'border-red-500' : ''}
            />
            {errors.currentStock && <p className="text-red-500 text-sm mt-1">{errors.currentStock}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minStock">Min Stock *</Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={(e) => handleInputChange('minStock', e.target.value)}
                min="0"
                className={errors.minStock ? 'border-red-500' : ''}
              />
              {errors.minStock && <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>}
            </div>
            <div>
              <Label htmlFor="maxStock">Max Stock *</Label>
              <Input
                id="maxStock"
                type="number"
                value={formData.maxStock}
                onChange={(e) => handleInputChange('maxStock', e.target.value)}
                min="1"
                className={errors.maxStock ? 'border-red-500' : ''}
              />
              {errors.maxStock && <p className="text-red-500 text-sm mt-1">{errors.maxStock}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="reorderPoint">Reorder Point *</Label>
            <Input
              id="reorderPoint"
              type="number"
              value={formData.reorderPoint}
              onChange={(e) => handleInputChange('reorderPoint', e.target.value)}
              min="0"
              className={errors.reorderPoint ? 'border-red-500' : ''}
            />
            {errors.reorderPoint && <p className="text-red-500 text-sm mt-1">{errors.reorderPoint}</p>}
          </div>

          <div>
            <Label htmlFor="unitCost">Unit Cost ($) *</Label>
            <Input
              id="unitCost"
              type="number"
              step="0.01"
              value={formData.unitCost}
              onChange={(e) => handleInputChange('unitCost', e.target.value)}
              min="0"
              className={errors.unitCost ? 'border-red-500' : ''}
            />
            {errors.unitCost && <p className="text-red-500 text-sm mt-1">{errors.unitCost}</p>}
          </div>

          {/* Status and Calculations */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Status:</span>
              {getStatusBadge()}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Total Value:</span>
              <span className="font-bold text-lg">${calculateTotalValue()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white">
          {item ? 'Update Item' : 'Create Item'}
        </Button>
      </div>
    </form>
  );
}