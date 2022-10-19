import Link, { LinkProps } from 'next/link'
import { ReactNode, forwardRef } from 'react'

type CustomLinkProps = {
  children: ReactNode
  rel?: string
  target?: '_self' | '_blank' | '_parent' | '_top'
} & LinkProps

// eslint-disable-next-line react/display-name
const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    { as, passHref, prefetch, replace, shallow, scroll, href, children, rel, target, ...rest },
    ref
  ) => {
    return (
      <Link
        href={href}
        as={as}
        passHref={passHref}
        prefetch={prefetch}
        replace={replace}
        shallow={shallow}
        scroll={scroll}
      >
        <a {...rest} rel={rel} target={target} ref={ref}>
          {children}
        </a>
      </Link>
    )
  }
)

export default CustomLink
