// postcss.config.js
export default {
  plugins: {
    'postcss-font-display': {
      // 默认就是 swap，也可以设为 optional, block, fallback
      display: 'swap',
      // FontAwesome 自带 font-display: block；默认只补缺不覆盖，必须显式开启替换
      replace: true,
    },
    '@fullhuman/postcss-purgecss': {
      // 指定要扫描的文件路径
      content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,vue,html}',
      ],

      // 关键：保留某些可能被动态生成或误删的选择器
      safelist: [
        // Font Awesome 的类通常以 fa- 开头，建议保留，防止图标消失
        // /^fa-/, 
        // /^fas-/,
        // /^fab-/,
        // 如果 animate.css 有动态类名，也可能需要保留
        // /^animate-/,
        // PurgeCSS 默认提取器会把 `sm:hidden` 拆成 `sm` 和 `hidden`，导致响应式变体被删
        /^(sm|md|lg|xl|2xl):/,
        /^hover:/,
      ],

      // 默认提取器通常能处理大部分情况，如果有特殊框架可配置 extractors
    },
    // 其他插件...
  }
}
