## Express

express を使い、クライアント側の処理を行った上で HTML を生成し、クライアントへ返します。

### ルーティング

https://github.com/hiroppy/ssr-sample/blob/master/src/server/router.ts

アクセスのルーティングを行います。  
`*`を一番下にすることにより、404 を含めたレンダリングをクライアントの react-router へ任せます。  
また、`/public`ではクライアント側からの静的ファイルの取得部分で使われます。  
`dist`には webpack でバンドルした生成ファイルが置かれています。

```javascript
import * as express from 'express';
import * as health from './controllers/health';
import * as renderer from './controllers/renderer';
import { endpoint } from '../graphql/constants';

export function router(app: express.Application) {
  app.use('/favicon.ico', (req, res) => res.status(200).send()); // 未設定
  app.use('/public', express.static('dist'));
  app.get('/api/health', health.get);
  app.get('*', renderer.get);
}
```

### HTML レンダリング

先にクライアントかなー
