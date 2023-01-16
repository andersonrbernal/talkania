/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PUBLIC_FOLDER: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
