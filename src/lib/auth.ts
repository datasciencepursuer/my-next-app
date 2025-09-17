import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AdminTokenPayload {
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not configured');
    }
    
    const payload = jwt.verify(token, jwtSecret) as AdminTokenPayload;
    return payload;
  } catch {
    return null;
  }
}

export function getAdminTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get('admin-token')?.value || null;
}

export function isAuthenticated(req: NextRequest): boolean {
  const token = getAdminTokenFromRequest(req);
  if (!token) return false;
  
  const payload = verifyAdminToken(token);
  return payload !== null && payload.isAdmin === true;
}