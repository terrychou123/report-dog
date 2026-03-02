'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

interface ChartRendererProps {
  extractedData?: {
    numbers?: Array<{ label: string; value: number }>;
    dates?: Array<{ label: string; date: string }>;
  } | null;
}

function buildChartData(extractedData: ChartRendererProps['extractedData']) {
  if (extractedData?.numbers && extractedData.numbers.length > 0) {
    return extractedData.numbers.slice(0, 10).map((item) => ({
      name: item.label,
      value: typeof item.value === 'number' ? item.value : parseFloat(String(item.value)) || 0,
    }));
  }
  // Fallback demo data
  return [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];
}

export function ChartRenderer({ extractedData }: ChartRendererProps) {
  const data = buildChartData(extractedData);

  return (
    <Tabs defaultValue="bar">
      <TabsList>
        <TabsTrigger value="bar">Bar Chart</TabsTrigger>
        <TabsTrigger value="line">Line Chart</TabsTrigger>
        <TabsTrigger value="pie">Pie Chart</TabsTrigger>
      </TabsList>

      <TabsContent value="bar" className="mt-4">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>

      <TabsContent value="line" className="mt-4">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>

      <TabsContent value="pie" className="mt-4">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
}
