import { ReactNode, forwardRef } from 'react'
import Link, { LinkProps } from 'next/link'

type CustomLinkProps = {
  children: ReactNode
  rel?: string
  target?: '_self' | '_blank' | '_parent' | '_top'
  classes?: string
} & LinkProps

// eslint-disable-next-line react/display-name
const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    {
      as,
      passHref,
      prefetch,
      replace,
      shallow,
      scroll,
      href,
      children,
      rel,
      target,
      classes,
      ...rest
    },
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
        <a {...rest} rel={rel} target={target} ref={ref} className={classes}>
          {children}
        </a>
      </Link>
    )
  }
)

export default CustomLink
