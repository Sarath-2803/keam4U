// API utility for backend authentication calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface SignupPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface SigninPayload {
  email: string;
  password: string;
}

interface GoogleSigninPayload {
  idToken: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    uid: string;
    email: string;
    name: string;
    [key: string]: any;
  };
  token?: string;
  error?: string;
}

export const authAPI = {
  /**
   * Sign up with email and password via backend
   */
  async signup(data: SignupPayload): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Signup failed');
      }

      return result;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  /**
   * Sign in with email and password via backend
   */
  async signin(data: SigninPayload): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Signin failed');
      }

      return result;
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  },

  /**
   * Sign in with Google via backend
   */
  async googleSignin(data: GoogleSigninPayload): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google-signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Google signin failed');
      }

      return result;
    } catch (error) {
      console.error('Google signin error:', error);
      throw error;
    }
  },

  /**
   * Verify token
   */
  async verifyToken(token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Token verification failed');
      }

      return result;
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  },

  /**
   * Get user profile
   */
  async getProfile(uid: string, token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch profile');
      }

      return result;
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(uid: string, token: string, data: Record<string, any>): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/${uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile');
      }

      return result;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  /**
   * Logout
   */
  async logout(token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Logout failed');
      }

      return result;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};

export default authAPI;
