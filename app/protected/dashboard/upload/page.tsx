import { DocumentUploadForm } from '@/components/documents/document-upload-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function UploadPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link href="/protected/dashboard">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Report</CardTitle>
          <CardDescription>
            Paste text or upload a file to get started with AI-powered editing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentUploadForm />
        </CardContent>
      </Card>
    </div>
  );
}
