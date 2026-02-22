/**
 * Format a date string (YYYY-MM) to readable format
 */
export function formatDateShort(dateString: string): string {
  const [year, month] = dateString.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthIndex = parseInt(month, 10) - 1;
  return `${months[monthIndex]} ${year}`;
}

/**
 * Format date range for display
 */
export function formatDateRange(startDate: string, endDate: string | null): string {
  const start = formatDateShort(startDate);
  const end = endDate ? formatDateShort(endDate) : 'Present';
  return `${start} - ${end}`;
}

/**
 * Calculate duration between two dates
 */
export function calculateDuration(startDate: string, endDate: string | null): string {
  const start = new Date(startDate + '-01');
  const end = endDate ? new Date(endDate + '-01') : new Date();
  
  const months = 
    (end.getFullYear() - start.getFullYear()) * 12 + 
    (end.getMonth() - start.getMonth());
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} yr${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} yr${years !== 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
  }
}

/**
 * Scroll to section with smart handling for last section
 */
export function scrollToSection(sectionId: string): void {
  if (typeof document === 'undefined') return;
  
  const targetElement = document.getElementById(sectionId);
  const contentScroll = document.getElementById('content-scroll');
  
  if (!targetElement || !contentScroll) return;
  
  // Get all sections to check if this is the last one
  const allSections = document.querySelectorAll('section[id]');
  const lastSection = allSections[allSections.length - 1];
  const isLastSection = lastSection && lastSection.id === sectionId;
  
  // Calculate scroll position
  const elementTop = targetElement.offsetTop;
  const containerHeight = contentScroll.clientHeight;
  const contentHeight = contentScroll.scrollHeight;
  
  if (isLastSection) {
    // Scroll to show the last section properly (align to bottom)
    const scrollTarget = contentHeight - containerHeight;
    contentScroll.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });
  } else {
    // Normal scroll to element
    contentScroll.scrollTo({
      top: elementTop - 30,
      behavior: 'smooth'
    });
  }
  
  // Update URL hash
  history.pushState(null, '', `#${sectionId}`);
}

/**
 * Update active state in navigation
 */
export function updateActiveNav(sectionId: string): void {
  if (typeof document === 'undefined') return;
  
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
  sidebarLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });
}

export function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  const noProjects = document.getElementById('no-projects');
  const resultsCount = document.getElementById('results-count');
  
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const language = button.getAttribute('data-language');
      
      // Update active button
      filterButtons.forEach((btn) => {
        btn.classList.remove('active', 'bg-(--ctp-mauve)', 'text-(--ctp-crust)');
        btn.classList.add('bg-(--ctp-surface0)', 'text-(--ctp-text)');
      });
      button.classList.add('active', 'bg-(--ctp-mauve)', 'text-(--ctp-crust)');
      button.classList.remove('bg-(--ctp-surface0)', 'text-(--ctp-text)');
      
      // Filter projects
      let visibleCount = 0;
      projectItems.forEach((item) => {
        const itemLang = item.getAttribute('data-language');
        if (language === 'all' || itemLang === language) {
          (item as HTMLElement).style.display = 'block';
          visibleCount++;
        } else {
          (item as HTMLElement).style.display = 'none';
        }
      });
      
      if (resultsCount) {
        resultsCount.textContent = `Showing ${visibleCount} repositor${visibleCount === 1 ? 'y' : 'ies'}`;
      }
      
      if (noProjects) {
        noProjects.classList.toggle('hidden', visibleCount > 0);
      }
    });
  });
}
