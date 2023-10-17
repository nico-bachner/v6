import { Back } from '@/components/client/Back'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="p-6">
    <Back href="/projects" />

    <article className="prose sm:prose-lg lg:prose-xl dark:prose-invert mx-auto my-20">
      {children}
    </article>
  </main>
)

export default Layout
