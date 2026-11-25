import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
	plugins: [
		tailwindcss(),
		// viteSingleFile()
	],
	build: {
		// 将默认的 esbuild 替换为 terser
		minify: 'terser',

		terserOptions: {
			format: {
				// 保留所有注释（包括普通注释和版权注释）
				comments: true,
				// 开启代码美化，保留换行和缩进格式
				beautify: true,
			},
			// 确保不混淆变量名
			compress: {
				// 如果希望完全保留原始变量名，可以设置为 false
				// 但通常保留格式和注释即可，这里保持默认压缩逻辑
			}
		},

		// CSS 同样需要单独处理以保留格式
		cssMinify: false,

		cssCodeSplit: true, // 确保开启 CSS 代码分割
		assetsInlineLimit: 0,
		rollupOptions: {
			output: {
				// 让 CSS 文件独立输出，而不是被 JS 内联
				assetFileNames: (assetInfo) => {
					if (assetInfo.names[0] && assetInfo.names[0].endsWith('.css')) {
						return 'assets/[name].[hash].css';
					}
					return 'assets/[name].[hash][ext]';
				}
			}
		}
	}
})