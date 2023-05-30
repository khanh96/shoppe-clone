import React, { ElementType, useRef, useState } from 'react'
import { FloatingArrow, FloatingPortal, arrow, useFloating, shift, offset, Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface PopoverProps {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: PopoverProps) {
  const arrowRef = useRef(null)
  const [isOpenTooltip, setIsOpenTooltip] = useState(initialOpen || false)

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    middleware: [
      offset({ crossAxis: 0, mainAxis: 0 }),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })
  const showPopover = () => {
    setIsOpenTooltip(true)
  }
  const hidePopover = () => {
    setIsOpenTooltip(false)
  }

  // const overrideFloatingStyles = useMemo(() => {
  //   return { ...floatingStyles, left: `${floatingStyles.left ? floatingStyles.left : 0 + 20}px` }
  // }, [floatingStyles])
  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <AnimatePresence>
        <FloatingPortal>
          {isOpenTooltip && (
            <div ref={refs.setFloating} style={floatingStyles}>
              <motion.div
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: `${middlewareData.arrow?.x}px top` }}
              >
                <FloatingArrow ref={arrowRef} context={context} fill='white' />
                {renderPopover}
              </motion.div>
            </div>
          )}
        </FloatingPortal>
      </AnimatePresence>
    </Element>
  )
}
