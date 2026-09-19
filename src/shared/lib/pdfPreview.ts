import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = pdfWorker

/**
 * Renders page 1 of a PDF to a PNG data URL so the certificate
 * shows like an image preview (no PDF viewer chrome).
 */
export async function renderPdfFirstPagePreview(file: File): Promise<string> {
  // Copy buffer — pdf.js may transfer/detach the original ArrayBuffer to the worker.
  const buffer = await file.arrayBuffer()
  const data = new Uint8Array(buffer).slice()

  const loadingTask = getDocument({
    data,
    disableAutoFetch: true,
    disableStream: true,
    useSystemFonts: true,
  })

  const pdf = await loadingTask.promise
  try {
    const page = await pdf.getPage(1)
    const baseViewport = page.getViewport({ scale: 1 })
    const scale = Math.min(2, 1000 / baseViewport.width)
    const viewport = page.getViewport({ scale })

    const canvas = document.createElement('canvas')
    canvas.width = Math.ceil(viewport.width)
    canvas.height = Math.ceil(viewport.height)

    const canvasContext = canvas.getContext('2d', { alpha: false })
    if (!canvasContext) throw new Error('Canvas unavailable')

    canvasContext.fillStyle = '#ffffff'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)

    const renderTask = page.render({
      canvasContext,
      viewport,
      background: '#ffffff',
    })
    await renderTask.promise

    return canvas.toDataURL('image/png')
  } finally {
    await pdf.destroy()
  }
}
