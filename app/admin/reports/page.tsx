'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  PieChart,
  Filter,
  RefreshCw
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'sales' | 'inventory' | 'customers' | 'financial';
  lastGenerated: string;
  size: string;
  status: 'ready' | 'generating' | 'error';
}

const availableReports: Report[] = [
  {
    id: 'sales-summary',
    name: 'Sales Summary Report',
    description: 'Comprehensive overview of sales performance, trends, and top products',
    type: 'sales',
    lastGenerated: '2024-01-20',
    size: '2.4 MB',
    status: 'ready'
  },
  {
    id: 'inventory-status',
    name: 'Inventory Status Report',
    description: 'Current stock levels, low stock alerts, and inventory valuation',
    type: 'inventory',
    lastGenerated: '2024-01-19',
    size: '1.8 MB',
    status: 'ready'
  },
  {
    id: 'customer-analytics',
    name: 'Customer Analytics Report',
    description: 'Customer behavior, demographics, and lifetime value analysis',
    type: 'customers',
    lastGenerated: '2024-01-18',
    size: '3.1 MB',
    status: 'ready'
  },
  {
    id: 'financial-overview',
    name: 'Financial Overview Report',
    description: 'Revenue, expenses, profit margins, and financial KPIs',
    type: 'financial',
    lastGenerated: '2024-01-17',
    size: '1.5 MB',
    status: 'ready'
  },
  {
    id: 'product-performance',
    name: 'Product Performance Report',
    description: 'Individual product sales, returns, and profitability analysis',
    type: 'sales',
    lastGenerated: '2024-01-16',
    size: '4.2 MB',
    status: 'generating'
  },
  {
    id: 'tax-report',
    name: 'Tax Report',
    description: 'Tax calculations, exemptions, and compliance documentation',
    type: 'financial',
    lastGenerated: '2024-01-15',
    size: '892 KB',
    status: 'ready'
  }
];

export default function AdminReportsPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState('last-30-days');

  const filteredReports = availableReports.filter(report => 
    selectedType === 'all' || report.type === selectedType
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sales': return <TrendingUp className="h-4 w-4" />;
      case 'inventory': return <Package className="h-4 w-4" />;
      case 'customers': return <Users className="h-4 w-4" />;
      case 'financial': return <DollarSign className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case 'generating':
        return <Badge className="bg-blue-100 text-blue-800">Generating</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const generateReport = (reportId: string) => {
    console.log(`Generating report: ${reportId}`);
    // In a real app, this would trigger report generation
    alert('Report generation started. You will be notified when it\'s ready.');
  };

  const downloadReport = (reportId: string) => {
    console.log(`Downloading report: ${reportId}`);
    // In a real app, this would download the report file
    alert('Report download started.');
  };

  const quickStats = {
    totalSales: 285000,
    totalOrders: 1250,
    totalCustomers: 850,
    inventoryValue: 125000
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and download business reports</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-90-days">Last 90 Days</option>
            <option value="last-year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${quickStats.totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quickStats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quickStats.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${quickStats.inventoryValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Current valuation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filter by type:</span>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
              >
                All Reports
              </Button>
              <Button
                variant={selectedType === 'sales' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('sales')}
                className="gap-1"
              >
                <TrendingUp className="h-3 w-3" />
                Sales
              </Button>
              <Button
                variant={selectedType === 'inventory' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('inventory')}
                className="gap-1"
              >
                <Package className="h-3 w-3" />
                Inventory
              </Button>
              <Button
                variant={selectedType === 'customers' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('customers')}
                className="gap-1"
              >
                <Users className="h-3 w-3" />
                Customers
              </Button>
              <Button
                variant={selectedType === 'financial' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('financial')}
                className="gap-1"
              >
                <DollarSign className="h-3 w-3" />
                Financial
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(report.type)}
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                </div>
                {getStatusBadge(report.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{report.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Generated:</span>
                  <span>{new Date(report.lastGenerated).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">File Size:</span>
                  <span>{report.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <Badge variant="outline" className="text-xs">
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => downloadReport(report.id)}
                  disabled={report.status !== 'ready'}
                  className="flex-1 gap-1"
                >
                  <Download className="h-3 w-3" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateReport(report.id)}
                  className="gap-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  Regenerate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Custom Report Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Create custom reports with specific metrics and date ranges tailored to your needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sales Analysis</option>
                  <option>Product Performance</option>
                  <option>Customer Insights</option>
                  <option>Financial Summary</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Last Year</option>
                  <option>Custom Range</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>PDF</option>
                  <option>Excel (XLSX)</option>
                  <option>CSV</option>
                </select>
              </div>
            </div>
            
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}