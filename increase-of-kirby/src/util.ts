export function getVariable(key: string): string {
  const variable = process.env[key]
  if (!variable) throw new Error(`環境変数'${key}'が取得できませんでした`)
  return variable
}

export function poyoText(count: number): string {
  let text = ':kirby:'
  for (let i = 0; i < count; i++) {
    text = text + ':kirby:'
  }
  return text
}
