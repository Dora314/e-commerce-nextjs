'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  Plus,
  Search,
  Download,
  Upload,
  Edit,
  BarChart3,
  Truck,
  CheckCircle,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { InventoryItem } from '@/types/product';
import InventoryItemForm from '@/components/admin/InventoryItemForm';

function RestockForm({ 
  item, 
  onRestock, 
  onCancel 
}: { 
  item: InventoryItem; 
  onRestock: (quantity: number) => void;
  onCancel: () => void;
}) {
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(quantity);
    if (qty > 0) {
      onRestock(qty);
    }
  };

  const suggestedQuantity = Math.max(0, item.maxStock - item.currentStock);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">SKU: {item.sku}</p>
        <p className="text-sm text-gray-600">Current Stock: {item.currentStock}</p>
        <p className="text-sm text-gray-600">Suggested Quantity: {suggestedQuantity}</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Restock Quantity</label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder={`e.g., ${suggestedQuantity}`}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Notes (Optional)</label>
        <Input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g., Supplier order #123"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Confirm Restock
        </Button>
      </div>
    </form>
  );
}

export default function AdminInventoryPage() {
  const { token } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await fetch('/api/admin/inventory', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch inventory data');
        }
        const data = await res.json();
        setInventory(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [token]);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalItems = inventory.length;
  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventory.filter(item => item.status === 'low-stock').length;
  const outOfStockItems = inventory.filter(item => item.status === 'out-of-stock').length;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'in-stock': { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      'low-stock': { variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      'out-of-stock': { variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
      'overstocked': { variant: 'default' as const, color: 'bg-blue-100 text-blue-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  const handleRestock = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsRestockDialogOpen(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditItemOpen(true);
  };

  const processRestock = (quantity: number) => {
    if (selectedItem) {
      console.log(`Restocking ${selectedItem.name} with ${quantity} units`);
      // In a real app, this would make an API call
      alert(`Successfully restocked ${selectedItem.name} with ${quantity} units`);
      setIsRestockDialogOpen(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your product inventory</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import Inventory
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={() => setIsAddItemOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Current inventory value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items need restocking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Urgent restocking needed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="overstocked">Overstocked</option>
            </select>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <Badge variant="outline">
              {filteredInventory.length} items found
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min/Max</TableHead>
                <TableHead>Unit Cost</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.supplier}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className={`font-bold ${
                        item.currentStock === 0 ? 'text-red-600' :
                        item.currentStock < item.minStock ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {item.currentStock}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="text-gray-500">Min:</span> {item.minStock}<br/>
                      <span className="text-gray-500">Max:</span> {item.maxStock}
                    </div>
                  </TableCell>
                  <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">${item.totalValue.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{new Date(item.lastRestocked).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRestock(item)}>
                          <Truck className="h-4 w-4 mr-2" />
                          Restock
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No inventory items found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Item Dialog */}
      <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
          </DialogHeader>
          <InventoryItemForm onClose={() => setIsAddItemOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditItemOpen} onOpenChange={setIsEditItemOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <InventoryItemForm 
              item={selectedItem}
              onClose={() => {
                setIsEditItemOpen(false);
                setSelectedItem(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Restock Dialog */}
      <Dialog open={isRestockDialogOpen} onOpenChange={setIsRestockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock Item</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <RestockForm 
              item={selectedItem} 
              onRestock={processRestock}
              onCancel={() => setIsRestockDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}