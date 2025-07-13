import type { Manifest } from 'vite'

type Options = {
  src: string
  async?: boolean
  prod?: boolean
  manifest?: Manifest
  nonce?: string
}

const ensureTrailngSlash = (path: string) => {
  return path.endsWith('/') ? path : path + '/'
}

export const Script = (options: Options): any => {
  const src = options.src
  if (options.prod ?? import.meta.env.PROD) {
    let manifest: Manifest | undefined = options.manifest
    if (!manifest) {
      const MANIFEST = import.meta.glob<{ default: Manifest }>('/dist/.vite/manifest.json', {
        eager: true,
      })
      for (const [, manifestFile] of Object.entries(MANIFEST)) {
        if (manifestFile['default']) {
          manifest = manifestFile['default']
          break
        }
      }
    }
    if (manifest) {
      const scriptInManifest = manifest[src.replace(/^\//, '')]
      if (scriptInManifest) {
        return (
            <script
              type='module'
              async={!!options.async}
              src={`${ensureTrailngSlash(import.meta.env.BASE_URL)}${scriptInManifest.file}`}
              nonce={options.nonce}
            ></script>
        )
      }
    }
    return <></>
  } else {
    return <script type='module' async={!!options.async} src={src} nonce={options.nonce}></script>
  }
}