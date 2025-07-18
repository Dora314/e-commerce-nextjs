'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProductFormProps {
  product?: Product;
  categories: string[];
  onClose: () => void;
  onSave: () => void;
}

export default function ProductForm({ product, categories, onClose, onSave }: ProductFormProps) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: undefined as number | undefined,
    image: '',
    images: [] as string[],
    category: '',
    stock: 0,
    rating: 0,
    reviews: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice ?? undefined,
        image: product.image,
        images: product.images || [],
        category: product.category,
        stock: product.stock,
        rating: product.rating,
        reviews: product.reviews,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        originalPrice: undefined,
        image: '',
        images: [],
        category: '',
        stock: 0,
        rating: 0,
        reviews: 0,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === '' ? undefined : parseFloat(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const apiEndpoint = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
    const method = product ? 'PUT' : 'POST';

    try {
      const res = await fetch(apiEndpoint, {
        method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save product');
      }

      alert(product ? 'Product updated successfully!' : 'Product created successfully!');
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const addImage = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      setFormData(prev => ({ ...prev, images: [...prev.images, newImageUrl.trim()] }));
      setNewImageUrl('');
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter(img => img !== imageToRemove) }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-500 bg-red-100 p-3 rounded">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
          </div>
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select name="category" value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Pricing & Inventory</h3>
          <div>
            <Label htmlFor="price">Price *</Label>
            <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleNumberChange} required />
          </div>
          <div>
            <Label htmlFor="originalPrice">Original Price (Optional)</Label>
            <Input id="originalPrice" name="originalPrice" type="number" step="0.01" value={formData.originalPrice ?? ''} onChange={handleNumberChange} />
          </div>
          <div>
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleNumberChange} required />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Images</h3>
        <div>
          <Label htmlFor="mainImage">Main Image URL *</Label>
          <Input id="mainImage" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" required />
        </div>
        <div>
          <Label>Additional Images</Label>
          <div className="flex gap-2 mb-2">
            <Input value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
            <Button type="button" onClick={addImage} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.images.length > 0 && (
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                  <span className="flex-1 text-sm truncate">{image}</span>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeImage(image)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white" disabled={isSaving}>
          {isSaving ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
        </Button>
      </div>
    </form>
  );
}