// Optional local backend, without changing the saved production API address.
export default process.env.LOCAL_BACKEND_URL ? {
  define: { 'process.env': { TIO_BOOT_ADMIN_BACKEND_URL: '' } },
  proxy: { '/api/': { target: process.env.LOCAL_BACKEND_URL, changeOrigin: true } },
} : {};
