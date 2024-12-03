import { Back } from '@/components/ui/Back'
import { LayoutProps } from '@/types/next'

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="p-6">
    <Back href="/projects" />

    {children}
  </div>
)

export default Layout
