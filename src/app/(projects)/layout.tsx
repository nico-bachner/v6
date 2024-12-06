import { Back } from '@/components/ui/Back'
import { LayoutProps } from '@/types/next'

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
    <Back href="/projects" className="sticky top-4 sm:top-6 lg:top-8" />

    {children}
  </div>
)

export default Layout
