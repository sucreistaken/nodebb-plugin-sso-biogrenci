# nodebb-plugin-sso-biogrenci

NodeBB plugin that adds a custom theme/styling layer for the **biogrenci** SSO entry point at [forum.ieu.app](https://forum.ieu.app) — Izmir University of Economics' student community.

It piggybacks on NodeBB's SSO architecture: the actual auth handshake is the standard SSO flow; this plugin tunes the visual landing surface so the SSO login feels native to the IEU brand instead of a generic NodeBB screen.

## What it does

- Custom CSS for the SSO landing / consent / error states
- Brand-specific hero, palette, typography
- Minor copy/microcopy overrides where the default NodeBB strings don't fit a university context

## Install

```bash
cd /path/to/nodebb
npm install nodebb-plugin-sso-biogrenci
./nodebb activate nodebb-plugin-sso-biogrenci
./nodebb build
./nodebb restart
```

## Scope

This is intentionally narrow — it's a *theming layer* over the SSO flow, not a full SSO implementation. Pair it with the actual SSO provider plugin you're using.

Specific to forum.ieu.app's deployment; included here as a reference for how to do institution-scoped SSO theming in NodeBB.
