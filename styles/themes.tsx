export const customThemeModal = {
  root: {
    base: 'fixed top-0 right-0 left-0 bottom-0 z-50 h-full  overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
    show: {
      on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
      off: 'hidden',
    },
    sizes: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
    },
    positions: {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'center-left': 'items-center justify-start',
      center: 'items-center justify-center',
      'center-right': 'items-center justify-end',
      'bottom-right': 'items-end justify-end',
      'bottom-center': 'items-end justify-center',
      'bottom-left': 'items-end justify-start',
    },
  },
  content: {
    base: 'relative h-full w-full p-0 md:h-auto rounded-lg',
    inner:
      'relative overflow-auto md:rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col h-full lg:h-3/5 justify-between lg:justify-start',
  },
  body: {
    base: 'flex-1 overflow-auto',
    popup: 'pt-0',
  },
  header: {
    base: 'flex items-start justify-between   dark:border-gray-600 border-b p-5',
    popup: 'p-2 border-b-0',
    title: 'text-xl font-medium text-gray-900 dark:text-white',
    close: {
      base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
      icon: 'h-5 w-5',
    },
  },
  footer: {
    base: 'flex items-center place-content-around space-x-2 rounded-b border-gray-200 p-0 dark:border-gray-600',
    popup: 'border-t',
  },
};

export const customThemeDraftModal = {
  root: {
    base: 'fixed top-0 right-0 left-0 z-50 h-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
    show: {
      on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
      off: 'hidden',
    },
    sizes: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
    },
    positions: {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'center-left': 'items-center justify-start',
      center: 'items-center justify-center',
      'center-right': 'items-center justify-end',
      'bottom-right': 'items-end justify-end',
      'bottom-center': 'items-end justify-center',
      'bottom-left': 'items-end justify-start',
    },
  },
  content: {
    base: 'relative h-[900vh] w-full  p-0 md:h-3/5  rounded-lg',
    inner:
      'relative  overflow-auto md:rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col h-full lg:h-3/5 justify-between lg:justify-start',
  },
  body: {
    base: 'flex-1 overflow-auto',
    popup: 'pt-0',
  },
  header: {
    base: 'flex items-start justify-between rounded-lg  dark:border-gray-600 border-b p-5',
    popup: 'p-2 border-b-0 rounded-lg',
    title: 'text-xl font-medium text-gray-900 dark:text-white',
    close: {
      base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
      icon: 'h-5 w-5',
    },
  },
  footer: {
    base: 'flex items-center place-content-around space-x-2 rounded-b border-gray-200 p-1 dark:border-gray-600',
    popup: 'border-t',
  },
};

export const customAlertModal = {
  root: {
    base: 'fixed top-0 right-0 left-0 z-[100] h-modal h-screen overflow-y-auto overflow-x-hidden inset-0 h-full',
    show: {
      on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
      off: 'hidden',
    },
    sizes: {
      sm: 'max-w-2xl',
      md: 'max-w-2xl',
      lg: 'max-w-2xl',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
    },
    positions: {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'center-left': 'items-center justify-start',
      center: 'items-center justify-center',
      'center-right': 'items-center justify-end',
      'bottom-right': 'items-end justify-end',
      'bottom-center': 'items-end justify-center',
      'bottom-left': 'items-end justify-start',
    },
  },
  content: {
    base: 'relative  w-full p-4 h-auto',
    inner: 'relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]',
  },
  body: {
    base: 'p-6 flex-1 overflow-auto',
    popup: 'pt-0',
  },
  header: {
    base: 'flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5',
    popup: 'p-2 border-b-0',
    title: 'text-xl font-medium text-gray-900 dark:text-white',
    close: {
      base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
      icon: 'h-5 w-5',
    },
  },
  footer: {
    base: 'flex items-center space-x-2 rounded-b border-gray-200 p-2 dark:border-gray-600',
    popup: 'border-t',
  },
};
export const customCanteenModal = {
  root: {
    base: 'fixed top-0 right-0 left-0 z-[100]  h-modal h-screen overflow-y-auto overflow-x-hidden inset-0 h-full',
    show: {
      on: 'flex bg-gray-900 flex bg-opacity-50 dark:bg-opacity-80',
      off: 'hidden',
    },
    sizes: {
      sm: 'max-w-lg',
      md: 'max-w-lg',
      lg: 'max-w-lg',
      xl: 'max-w-lg',
      '2xl': 'max-w-lg',
      '3xl': 'max-w-lg',
      '4xl': 'max-w-lg',
      '5xl': 'max-w-lg',
      '6xl': 'max-w-lg',
      '7xl': 'max-w-lg',
    },
    positions: {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'center-left': 'items-center justify-start',
      center: 'items-center justify-center',
      'center-right': 'items-center justify-end',
      'bottom-right': 'items-end justify-end',
      'bottom-center': 'items-end justify-center',
      'bottom-left': 'items-end justify-start',
    },
  },
  content: {
    base: 'relative  flex align-center justify-center w-full p-4 h-96',
    inner: 'relative w-full rounded-2xl bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]',
  },
  body: {
    base: 'p-6 flex-1 overflow-auto',
    popup: 'pt-0',
  },
  header: {
    base: 'flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5',
    popup: 'p-2 border-b-0',
    title: 'text-xl font-medium text-gray-900 dark:text-white',
    close: {
      base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
      icon: 'h-5 w-5',
    },
  },
  footer: {
    base: 'flex items-center space-x-2 rounded-b border-gray-200 p-2 dark:border-gray-600',
    popup: 'border-t',
  },
};

export const customThemeWaiterModal = {
  root: {
    base: 'fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden inset-0 h-full',
    show: {
      on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
      off: 'hidden',
    },
    sizes: {
      sm: 'max-w-2xl',
      md: 'max-w-2xl',
      lg: 'max-w-2xl',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
    },
    positions: {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'center-left': 'items-center justify-start',
      center: 'items-center justify-center',
      'center-right': 'items-center justify-end',
      'bottom-right': 'items-end justify-end',
      'bottom-center': 'items-end justify-center',
      'bottom-left': 'items-end justify-start',
    },
  },
  content: {
    base: 'relative  w-full p-4 h-auto',
    inner: 'relative rounded-2xl bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]',
  },
  body: {
    base: 'p-6 flex-1 overflow-auto',
    popup: 'pt-0',
  },
  header: {
    base: 'flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5',
    popup: 'p-2 border-b-0',
    title: 'text-xl font-medium text-gray-900 dark:text-white',
    close: {
      base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
      icon: 'h-5 w-5',
    },
  },
  footer: {
    base: 'flex items-center space-x-2 rounded-b border-gray-200 p-2 dark:border-gray-600',
    popup: 'border-t',
  },
};

export const customThemePaymentModal = {
  root: {
    base: 'fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden inset-0 h-full',
    show: {
      on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
      off: 'hidden',
    },
    sizes: {
      sm: 'max-w-lg',
      md: 'max-w-lg',
      lg: 'max-w-lg',
      xl: 'max-w-lg',
      '2xl': 'max-w-lg',
      '3xl': 'max-w-lg',
      '4xl': 'max-w-lg',
      '5xl': 'max-w-lg',
      '6xl': 'max-w-lg',
      '7xl': 'max-w-lg',
    },
    positions: {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'center-left': 'items-center justify-start',
      center: 'items-center justify-center',
      'center-right': 'items-center justify-end',
      'bottom-right': 'items-end justify-end',
      'bottom-center': 'items-end justify-center',
      'bottom-left': 'items-end justify-start',
    },
  },
  content: {
    base: 'relative  w-full p-4 h-auto',
    inner: 'relative rounded-2xl bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]',
  },
  body: {
    base: 'p-6 flex-1 overflow-auto',
    popup: 'pt-0',
  },
  header: {
    base: 'flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5',
    popup: 'p-2 border-b-0',
    title: 'text-xl font-medium text-gray-900 dark:text-white',
    close: {
      base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
      icon: 'h-5 w-5',
    },
  },
  footer: {
    base: 'flex items-center space-x-2 rounded-b border-gray-50 p-2 dark:border-gray-600',
    popup: 'border-t',
  },
};
