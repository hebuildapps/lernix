import { UserRole } from '../contexts/AuthContext';

export const authConfig = {
  credentials: {
    student: { password: 'student123', redirect: '/student' },
    teacher: { password: 'teacher123', redirect: '/teacher/dashboard' },
    admin: { password: 'admin123', redirect: '/admin' }
  }
};

export function checkAuth(): { isAuthenticated: boolean; userRole: UserRole | null } {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, userRole: null };
  }

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole') as UserRole | null;

  return { isAuthenticated, userRole };
}

export function validateCredentials(role: UserRole, password: string): boolean {
  return authConfig.credentials[role].password === password;
}

export function getRedirectPath(role: UserRole): string {
  return authConfig.credentials[role].redirect;
}

export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  }
}

export function setAuth(role: UserRole): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  }
}