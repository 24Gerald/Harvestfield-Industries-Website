import type { MediaBlock } from '@/lib/media'

/** Renders a post's content blocks: paragraphs, headings, images and tables. Used on the site and in the admin preview. */
export function PostBody({ blocks }: { blocks: MediaBlock[] }) {
  return (
    <div className="text-hf-slate">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading':
            return <h2 key={block.id} className="mt-9 text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] text-hf-forest first:mt-0 sm:mt-12 sm:text-3xl">{block.text}</h2>
          case 'paragraph':
            return <p key={block.id} className="mt-4 whitespace-pre-line text-[1.0625rem] leading-8 first:mt-0 sm:mt-5 sm:text-lg sm:leading-8">{block.text}</p>
          case 'image':
            return (
              <figure key={block.id} className="mt-7 first:mt-0 sm:mt-10">
                <img src={block.url} alt={block.caption ?? ''} loading="lazy" className="w-full rounded-2xl bg-hf-sand object-cover sm:rounded-3xl" />
                {block.caption && <figcaption className="mt-2.5 text-sm leading-6 text-hf-sage">{block.caption}</figcaption>}
              </figure>
            )
          case 'table': {
            const [head, ...body] = block.header ? block.rows : [undefined, ...block.rows]
            return (
              <figure key={block.id} className="mt-7 first:mt-0 sm:mt-10">
                <div className="overflow-x-auto rounded-2xl border border-hf-line bg-white">
                  <table className="w-full min-w-max border-collapse text-left text-sm sm:text-[15px]">
                    {head && (
                      <thead>
                        <tr className="bg-hf-forest text-white">
                          {head.map((cell, i) => <th key={i} scope="col" className="px-4 py-3 font-semibold sm:px-5">{cell}</th>)}
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {body.map((row, r) => (
                        <tr key={r} className="border-t border-hf-line first:border-t-0 even:bg-hf-cream/60">
                          {(row ?? []).map((cell, i) => <td key={i} className="px-4 py-3 align-top sm:px-5">{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && <figcaption className="mt-2.5 text-sm leading-6 text-hf-sage">{block.caption}</figcaption>}
              </figure>
            )
          }
        }
      })}
    </div>
  )
}
