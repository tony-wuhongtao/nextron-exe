<p align="center"><img src="https://i.imgur.com/a9QWW0v.png"></p>

## Usage

### Create an App

```
# with npx
$ npx create-nextron-app my-app --example with-tailwindcss

# with yarn
$ yarn create nextron-app my-app --example with-tailwindcss

# with pnpm
$ pnpm dlx create-nextron-app my-app --example with-tailwindcss
```

### Install Dependencies

```
$ cd my-app

# using yarn or npm
$ yarn (or `npm install`)

# using pnpm
$ pnpm install --shamefully-hoist
```

### Use it

```
# development mode
$ yarn dev (or `npm run dev` or `pnpm run dev`)

# production build
$ yarn build (or `npm run build` or `pnpm run build`)
```

## 必须使用Admin的cmd进行build！！！

## 注意服务器端的ollama和stable diffusion都需要打开cors

### ollama linux版 打开方法：
system service 文件里加
Environment="OLLAMA_ORIGINS=*"

### sd webui linux版 打开方法：
webui-user.sh

export COMMANDLINE_ARGS="--api --listen --xformers --enable-insecure-extension-access --cors-allow-origins "*""

--cors-allow-origins "*"     为新加
