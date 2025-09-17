// import { NextResponse, NextRequest } from 'next/server';
// import payload from 'payload';
// import { AdminUsers } from '@/collections/AdminUsers';
// import { Users } from '@/collections/Users';

// // Public routes
// const publicRoutes = ['/posts', '/'];

// // User-protected routes
// const userProtectedRoutes = ['/dashboard'];

// // Admin-protected routes
// const adminProtectedRoutes = ['/admin'];

// // Init Payload CMS
// const getPayloadClient = async () => {
//   try {
//     await payload.init({
//       mongoURL: process.env.DATABASE_URI || '',
//       collections: [AdminUsers, Users],
//     });
//     return payload;
//   } catch (error) {
//     console.error('Failed to initialize Payload CMS:', error);
//     throw new Error('Payload initialization failed');
//   }
// };

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Allow public routes
//   if (publicRoutes.some((route) => pathname.startsWith(route))) {
//     return NextResponse.next();
//   }

//   const userToken = request.cookies.get('payload-token')?.value;
//   const adminToken = request.cookies.get('payload-admin-token')?.value;

//   let payloadClient;
//   try {
//     payloadClient = await getPayloadClient();
//   } catch {
//     return NextResponse.redirect(new URL('/error?message=server-error', request.url));
//   }

//   // User-protected routes
//   if (userProtectedRoutes.some((route) => pathname.startsWith(route))) {
//     if (!userToken) {
//       return NextResponse.redirect(new URL('/login?redirect=' + encodeURIComponent(pathname), request.url));
//     }

//     try {
//       const { user } = await payloadClient.auth({
//         collection: 'users',
//         token: userToken,
//       });

//       if (!user || !['subscriber', 'author'].includes(user.role)) {
//         return NextResponse.redirect(new URL('/login?message=unauthorized', request.url));
//       }

//       request.headers.set('x-user', JSON.stringify(user));
//       return NextResponse.next();
//     } catch (error) {
//       console.error('User token verification failed:', error);
//       return NextResponse.redirect(new URL('/login?message=invalid-token', request.url));
//     }
//   }

//   // Admin-protected routes
//   if (adminProtectedRoutes.some((route) => pathname.startsWith(route))) {
//     if (!adminToken) {
//       return NextResponse.redirect(new URL('/admin/login?redirect=' + encodeURIComponent(pathname), request.url));
//     }

//     try {
//       const { user: admin } = await payloadClient.auth({
//         collection: 'admin-users',
//         token: adminToken,
//       });

//       if (!admin || !['admin', 'super admin'].includes(admin.role)) {
//         return NextResponse.redirect(new URL('/admin/login?message=unauthorized', request.url));
//       }

//       request.headers.set('x-admin', JSON.stringify(admin));
//       return NextResponse.next();
//     } catch (error) {
//       console.error('Admin token verification failed:', error);
//       return NextResponse.redirect(new URL('/admin/login?message=invalid-token', request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/admin/:path*', '/api/:path*'],
// };
