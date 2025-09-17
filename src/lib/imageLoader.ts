// Image loader service for loading and caching images for PDF generation
let cachedLogoBuffer: Buffer | null = null;
let cachedLogoDataUrl: string | null = null;

const LOGO_URL = 'https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmif52bW8nQmfqCWT9HbUwVDZ5GaIkPloNy301';

export async function loadLogoImage(): Promise<{ buffer: Buffer; dataUrl: string }> {
  if (cachedLogoBuffer && cachedLogoDataUrl) {
    return { buffer: cachedLogoBuffer, dataUrl: cachedLogoDataUrl };
  }

  try {
    console.log('Loading logo image from:', LOGO_URL);
    const response = await fetch(LOGO_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Get content type and validate
    const contentType = response.headers.get('content-type');
    console.log('Image content type:', contentType);
    console.log('Buffer size:', buffer.length);
    
    // Force to PNG format for React-PDF compatibility
    const dataUrl = `data:image/png;base64,${buffer.toString('base64')}`;

    // Cache the results
    cachedLogoBuffer = buffer;
    cachedLogoDataUrl = dataUrl;

    console.log('Logo image loaded successfully, size:', buffer.length);
    console.log('Data URL preview:', dataUrl.substring(0, 100) + '...');
    return { buffer, dataUrl };
  } catch (error) {
    console.error('Failed to load logo image:', error);
    throw error;
  }
}

export function getCachedLogoDataUrl(): string | null {
  return cachedLogoDataUrl;
}

export function clearLogoCache(): void {
  cachedLogoBuffer = null;
  cachedLogoDataUrl = null;
}