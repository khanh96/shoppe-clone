# Dự án Shopee Clone Typescript

## Chức năng trong dự án

- Authentication module: Quản lý bằng JWT

  - Đăng ký
  - Đăng nhập
  - Đăng xuất

- Trang danh sách sản phẩm:

  - Có phân trang
  - Sort (sắp xếp) theo từng thuộc tính sản phẩm
  - filter nâng cao theo từng thuộc tính sản phẩm
  - Tìm kiếm sản phẩm

- Trang chi tiết sản phẩm:

  - Hiển thị thông tin chi tiết
  - Ảnh hiển thị theo slider + hover zoom effect
  - Mô tả thì hiển thị rich text dạng WYSIWYG HTML
  - Có chức năng mua hàng

- Giỏ hàng

  - Quản lý đơn hàng: Thêm, sửa, xóa sản phẩm
  - Mua hàng

- Quản lý Profile khách hàng

  - Update thông tin cá nhân
  - Upload Avatar
  - Đổi mật khẩu
  - Xem tình trạng đơn hàng

## Công nghệ sử dụng

- UI / CSS Library: Tailwindcss + HeadlessUI
- State Management: React Query cho async state và React Context cho state thường
- Form Management: React Hook Form
- Router: React Router
- Build tool: Vite
- API: Rest API dựa trên server mình cung cấp sẵn
- Hỗ trợ đa ngôn ngữ với react.i18next
- Hỗ trợ SEO với React Helmet
- Mô hình hóa các component với story book
- Unit Test
- Và còn nhiều thứ nữa khi làm chúng ta sẽ áp dụng...

## Cài đặt package cho dự án Vite React TS

### Cài các depedency

### Bộ ESLint và Prettier trước

> Chúng ta sẽ cài hơi nhiều package 1 tí vì chúng ta setup từ đầu, còn Create React App setup sẵn 1 số thứ về ESLint rồi.

Dưới đây là những depedency mà chúng ta cần cài

- ESLint: linter (bộ kiểm tra lỗi) chính

- Prettier: code formatter chính

- @typescript-eslint/eslint-plugin: ESLint plugin cung cấp các rule cho Typescript

- @typescript-eslint/parser: Parser cho phép ESLint kiểm tra lỗi Typescript.

- eslint-config-prettier: Bộ config ESLint để vô hiệu hóa các rule của ESLint mà xung đột với Prettier.

- eslint-plugin-import: Để ESLint hiểu về cú pháp `import...` trong source code.

- eslint-plugin-jsx-a11y: Kiểm tra các vấn đề liên quan đến accessiblity (Tính thân thiện website, ví dụ cho thiết bị máy đọc sách).

- eslint-plugin-react: Các rule ESLint cho React

- eslint-plugin-prettier: Dùng thêm 1 số rule Prettier cho ESLint

- prettier-plugin-tailwindcss: Sắp xếp class tailwindcss

- eslint-plugin-react-hooks: ESLint cho React hook

Chạy câu lệnh dưới đây

```bash
yarn add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks -D
```

Cấu hình ESLint

Tạo file `.eslintrc.cjs` tại thư mục root

```js
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  extends: [
    // Chúng ta sẽ dùng các rule mặc định từ các plugin mà chúng ta đã cài.
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    // Disable các rule mà eslint xung đột với prettier.
    // Để cái này ở dưới để nó override các rule phía trên!.
    'eslint-config-prettier',
    'prettier'
  ],
  plugins: ['prettier'],
  settings: {
    react: {
      // Nói eslint-plugin-react tự động biết version của React.
      version: 'detect'
    },
    // Nói ESLint cách xử lý các import
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '')],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  env: {
    node: true
  },
  rules: {
    // Tắt rule yêu cầu import React trong file jsx
    'react/react-in-jsx-scope': 'off',
    // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
    'react/jsx-no-target-blank': 'warn',
    // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
```

Tạo file `.eslintignore`

```json
node_modules/
dist/
```

Tạo file `.prettierrc`

```json
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}
```

Tạo file `.prettierignore`

```json
node_modules/
dist/
```

Thêm script mới vào `package.json`

```json
  "scripts": {
    ...
    "lint": "eslint --ext ts,tsx src/",
    "lint:fix": "eslint --fix --ext ts,tsx src/",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\""
  },
```

### Cài editorconfig

Tạo file `.editorconfig` ở thư mục root

```EditorConfig
[*]
indent_size = 2
indent_style = space
```

### Cấu hình tsconfig.json

Set `"target": "ES2015"` và `"baseUrl": "."` trong `compilerOptions`

### Cài tailwindcss

Cài các package dưới đây: Tham khảo [https://tailwindcss.com/docs/guides/vite](https://tailwindcss.com/docs/guides/vite)

```bash
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Cấu hình file config

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

Thêm vào file `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Cấu hình vite config

Cài package `@types/node` để sử dụng node js trong file ts không bị lỗi

```bash
yarn add -D @types/node
```

file `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
```

### Cài extension và setup VS Code

Các Extension nên cài

- ESLint

- Prettier - Code formatter

- Tailwindcss

- EditorConfig for VS Code

Cấu hình VS Code

- Bật Format On Save
- Chọn Default Formatter là Prettier

> Có 3 môi trường khi làm việc
>
> 1. Môi trường VS Code, khi chúng ta đưa chuột vào click thì chạy đến đúng file
> 2. Môi trường ES Lint -> file .eslintignore
> 3. Môi trường Terminal\* ->

## Ghi chú code

Code xóa các ký tự đặc biệt trên bàn phím

```ts
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
```

Sữa lỗi Tailwindcss Extension không gợi ý class

Các bạn thêm đoạn code này vào `settings.json` của VS Code

```json
{
  //...
  "tailwindCSS.experimental.classRegex": ["[a-zA-Z]*class[a-zA-Z]*='([^']+)'"]
}
```

### Chú ý:

### tsconfig.json

https://www.typescriptlang.org/tsconfig#module

### React Hook Form

- noValidate: ngăn không cho validate default của html.

```jsx
  <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
```

- sử dụng register để dki cho từng input

```jsx
<input
  type='email'
  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
  placeholder='Email'
  {...register('email', rules.email)}
/>
```

- Muốn truyền tham số vào rules để custom rules thì phải truyền vào kiểu function (tham khảo file rules.ts)

### Tailwindcss

- Custom mô phỏng container Tailwindcss [https://tailwindcss.com/docs/plugins][https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js]

```ts
/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const components = {
        '.container': {
          maxWidth: theme('columns.7xl'), // max-w-7xl
          marginLeft: 'auto', //mx-auto
          marginRight: 'auto', //mx-auto
          paddingLeft: theme('spacing.4') //px-4
        }
      }
      addComponents(components)
    })
  ]
}
```

- Sử dụng background custom thì thêm class với bg-[linear-gradient(-180deg,#f53d2d,#f63)]
- Sử dụng web herroicons để lấy icon cho tailwindcss [https://heroicons.com/]
- Muốn **truncation multiable line** thì cài thêm thư viện vào taiwindcss [https://tailwindcss.com/blog/multi-line-truncation-with-tailwindcss-line-clamp]

#### TIP

- xứ lý show nhiều error trong 1 form.

```jsx
const formError = error.response?.data.data
  // cách show lỗi với nhiều trường trong 1 form
if (formError) {
  Object.keys(formError).forEach((key) => {
    setError(key as keyof Omit<FormData, 'confirm_password'>, {
      type: 'server',
      message: formError[key as keyof Omit<FormData, 'confirm_password'>]
    })
  })
}
```

- Thêm as const vào để objec này chỉ có thể đọc mà thôi.

```js
export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  profile: '/profile'
} as const

```

- Format số theo currency và social number sử dụng **Intl** [https://www.freecodecamp.org/news/how-to-format-number-as-currency-in-javascript-one-line-of-code/]

- Thuật toán render rating dựa vào index và rating
  VD: rating= 3.4 ; index= 1->5
  1 < 3.4 => 100%
  2 < 3.4 => 100%
  3 < 3.4 => 100%
  4 < 3.4 => 4 - 3.4 < 1 => 40%
  5 < 3.4 => 5 - 3.4 > 1 => 0%

- Thuật toán pagination
  Với rang=2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page

[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20
1 2 ... 4 5 [6] 8 9 ... 19 20
...
1 2 ... 13 14 [15] 16 17 ... 19 20
1 2 ... 14 15 [16] 17 18... 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]

- Sử dụng Link thay cho button trong 1 số trường hợp: như filter khi click vào.

* Nó sẽ có link khi hover vào và có thể new tab

- Sử dụng button trong những trường hợp submit or filter theo giá trị nào đó.

### Floating-ui

- Sử dụng floating UI để tính cách position [https://floating-ui.com/docs/getting-started]
- dùng useFloating để hiển thị tooltip
- FloatingArrow để hiển thị mũi tên
- Đừng shift để khả năng hiển thị dịch chuyển phần tử nổi dọc theo các trục đã chỉ định để giữ cho phần tử đó ở chế độ xem.

### framer motion

- dùng framer motion để sử lý animation [https://www.framer.com/motion/]

### React Router

- Sử dụng **useRouterElement** thì các router object sẽ sắp xếp theo thứ tự từ trên xuống dưới. Nên hãy chú ý cách sắp xếp các thứ tự router object. Để xử lý vấn để này thì dùng index
- Sử dụng **useMatch** để check router khớp với path
- Sử dụng **useParams** để lấy params truyền qua các url
- Sử dụng **useSearchParams** để sort và filter trên thanh url. Viết 1 hook useSearchParams để handle

### http & Axios

- Tạo biến và lưu accessToken từ localStorage để lúc lấy accessToken sẽ lấy từ RAM nhanh hơn là lấy từ bộ nhớ (localStorage)
- Chỉ chạy 1 lần trong constructor()
  ```jsx
  this.accessToken = getAccessTokenFromLS()
  ```

### React Query

- **keepPreviousData** Khi query data thì lúc dầud data sẽ undefined sau đó mới có data. Nên sẽ bị giật. Chúng ta thêm thuộc tính này vào để data không bị giật mỗi lần query api.
