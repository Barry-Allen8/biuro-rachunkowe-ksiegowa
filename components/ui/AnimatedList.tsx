import React, { useRef, useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedListProps<T> {
    items: T[];
    onItemSelect?: (item: T, index: number) => void;
    showGradients?: boolean;
    enableArrowNavigation?: boolean;
    className?: string;
    itemClassName?: string;
    displayScrollbar?: boolean;
    initialSelectedIndex?: number;
    renderItem?: (item: T, index: number, isSelected: boolean) => ReactNode;
}

const AnimatedItem: React.FC<{
    children: ReactNode;
    delay?: number;
    index: number;
    onMouseEnter?: () => void;
    onClick?: () => void;
}> = ({
    children,
    delay = 0,
    index,
    onMouseEnter,
    onClick
}) => {
        const ref = useRef(null);
        const inView = useInView(ref, { amount: 0.5, once: false });

        return (
            <motion.div
                ref={ref}
                data-index={index}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring', damping: 20, stiffness: 300 }}
                className="mb-4 cursor-pointer w-full"
            >
                {children}
            </motion.div>
        );
    };

export const AnimatedList = <T,>({
    items,
    onItemSelect,
    showGradients = true,
    enableArrowNavigation = true,
    className = '',
    itemClassName = '',
    displayScrollbar = true,
    initialSelectedIndex = -1,
    renderItem
}: AnimatedListProps<T>) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
    const [keyboardNav, setKeyboardNav] = useState(false);
    const [topGradientOpacity, setTopGradientOpacity] = useState(0);
    const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

    const handleItemMouseEnter = useCallback((index: number) => {
        // Only update selection on hover if not using keyboard to prevent jumping
        if (!keyboardNav) {
            setSelectedIndex(index);
        }
    }, [keyboardNav]);

    const handleItemClick = useCallback(
        (item: T, index: number) => {
            setSelectedIndex(index);
            if (onItemSelect) {
                onItemSelect(item, index);
            }
        },
        [onItemSelect]
    );

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        setTopGradientOpacity(Math.min(scrollTop / 50, 1));
        const bottomDistance = scrollHeight - (scrollTop + clientHeight);
        setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
    }, []);

    useEffect(() => {
        if (!enableArrowNavigation) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only capture events if the list is in focus or we decide to global capture (be careful with global capture)
            // For now, let's simplistic approach: if user is interacting with FAQs, they might want arrows.
            // But global arrows might conflict with page scroll. 
            // Safe implementation: Only if list has focus? Or strictly specific keys.
            // The original component had global listener.

            const isVisible = listRef.current && listRef.current.getBoundingClientRect().top < window.innerHeight && listRef.current.getBoundingClientRect().bottom > 0;
            if (!isVisible) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setKeyboardNav(true);
                setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setKeyboardNav(true);
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    e.preventDefault();
                    if (onItemSelect) {
                        onItemSelect(items[selectedIndex], selectedIndex);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

    useEffect(() => {
        if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
        const container = listRef.current;

        // We need to find the item. The original code used querySelector on data-index.
        // Our AnimatedItem needs to ensure it renders that attribute.
        const selectedElement = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;

        if (selectedElement) {
            const extraMargin = 50;
            const containerScrollTop = container.scrollTop;
            const containerHeight = container.clientHeight;
            const itemTop = selectedElement.offsetTop;
            const itemBottom = itemTop + selectedElement.offsetHeight;

            if (itemTop < containerScrollTop + extraMargin) {
                container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
            } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
                container.scrollTo({
                    top: itemBottom - containerHeight + extraMargin,
                    behavior: 'smooth'
                });
            }
        }
        // We reset keyboardNav only after scrolling, or maybe we keep it true until mouse move?
        // Original code set it false immediately, relying on state update.
        // Let's toggle it off on mouse enter to switch modes.
    }, [selectedIndex, keyboardNav]);

    return (
        <div className={`relative ${className}`}>
            <div
                ref={listRef}
                className={`max-h-[600px] overflow-y-auto pr-2 ${!displayScrollbar ? 'scrollbar-none' : 'scrollbar-thin scrollbar-thumb-navy-200 scrollbar-track-transparent'}`}
                onScroll={handleScroll}
                style={{ scrollBehavior: 'smooth' }}
            >
                {items.map((item, index) => (
                    <AnimatedItem
                        key={index}
                        index={index}
                        onMouseEnter={() => handleItemMouseEnter(index)}
                        onClick={() => handleItemClick(item, index)}
                    >
                        {renderItem ? renderItem(item, index, selectedIndex === index) : (
                            <div className={`p-4 bg-white rounded-lg border transition-all ${selectedIndex === index ? 'border-navy-900 shadow-md scale-[1.01]' : 'border-navy-100'} ${itemClassName}`}>
                                {String(item)}
                            </div>
                        )}
                    </AnimatedItem>
                ))}
            </div>
            {showGradients && (
                <>
                    <div
                        className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none transition-opacity duration-300 z-10"
                        style={{ opacity: topGradientOpacity }}
                    ></div>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-300 z-10"
                        style={{ opacity: bottomGradientOpacity }}
                    ></div>
                </>
            )}
        </div>
    );
};
