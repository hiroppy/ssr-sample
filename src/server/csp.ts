import { Request, Response, NextFunction } from 'express';
import * as helmet from 'helmet';
import nanoid from 'nanoid';
import ua from 'ua-parser-js';

export function generateNonceId(req: Request, res: Response, next: NextFunction) {
  res.locals.nonce = Buffer.from(nanoid(32)).toString('base64');
  next();
}

// google font: https://stackoverflow.com/a/34576000/7014700
const baseDirectives: helmet.IHelmetContentSecurityPolicyDirectives = {
  defaultSrc: ["'self'"],
  styleSrc: ["'unsafe-inline'", 'fonts.googleapis.com'], // for styled-components
  fontSrc: ["'self'", 'data: fonts.gstatic.com'],
  imgSrc: ["'self'", 'img.shields.io'], // for README
  connectSrc: ["'self'", 'img.shields.io', 'fonts.googleapis.com', 'fonts.gstatic.com'], // for service-worker
  workerSrc: ["'self'"],
};

// chrome, firefox
const lv3Directives: helmet.IHelmetContentSecurityPolicyDirectives = {
  ...baseDirectives,
  scriptSrc: [(req, res) => `'nonce-${res.locals.nonce}'`, "'strict-dynamic'", "'unsafe-eval'"],
};

// safari
// TODO: cannot load a file to be imported as dynamic because cannot use strict-dynamic
const lv2Directives: helmet.IHelmetContentSecurityPolicyDirectives = {
  ...baseDirectives,
  scriptSrc: [
    "'self",
    (req, res) => `'nonce-${res.locals.nonce}'`,
    "'unsafe-eval'",
    "'unsafe-inline'",
  ],
};

export function csp(req: Request, res: Response, next: NextFunction) {
  const directives = ['Chrome', 'Firefox'].includes(
    // TODO: fix
    (ua as any)(req.headers['user-agent']).browser.name
  )
    ? lv3Directives
    : lv2Directives;

  helmet.contentSecurityPolicy({ directives })(req, res, next);
}
