export function extractPlainText(node: any): string {
  if (!node) return ''

  if (node.type === 'text') {
    return node.text
  }

  if (Array.isArray(node.children)) {
    return node.children.map(extractPlainText).join(' ')
  }

  return ''
}