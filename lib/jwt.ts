import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

// Default options for signing the JWT
const DEFAULT_SIGN_OPTION: SignOptions = {
    expiresIn: '1d',
};

// Function to sign a JWT access token
export function signJwtAccessToken(
    payload: Record<string, unknown>, // Accepts a generic object payload
    options: SignOptions = DEFAULT_SIGN_OPTION // Optional custom signing options
): string {
    const secretKey = process.env.NEXTAUTH_SECRET;

    if (!secretKey) {
        throw new Error('NEXTAUTH_SECRET environment variable is not set');
    }

    const token = jwt.sign(payload, secretKey, options);
    return token;
}

// Function to verify a JWT token
export function verifyJwtToken(token: string): JwtPayload | null {
    try {
        const secretKey = process.env.NEXTAUTH_SECRET;

        if (!secretKey) {
            throw new Error('NEXTAUTH_SECRET environment variable is not set');
        }

        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        return decoded;
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}
