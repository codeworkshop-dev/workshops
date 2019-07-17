export default function(...args) {
  return args.filter(Boolean).join(' ');
}
