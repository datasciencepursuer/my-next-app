import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { loadLogoImage } from '@/lib/imageLoader';

export async function POST(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.log('Loading logo image...');
    const { dataUrl } = await loadLogoImage();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Logo loaded successfully',
      dataUrl: dataUrl.substring(0, 50) + '...' // Don't send full data URL in response, just confirmation
    });
  } catch (error) {
    console.error('Logo loading error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to load logo' 
    }, { status: 500 });
  }
}