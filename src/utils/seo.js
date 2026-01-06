/**
 * SEO Utilities for ReportHere
 * Handles dynamic meta tags, Open Graph, Twitter Cards, and structured data
 */

export const SEO = {
  /**
   * Update page meta tags dynamically
   * @param {Object} options - SEO options
   */
  updateMetaTags({
    title,
    description,
    image,
    url,
    type = 'website',
    keywords = [],
    author = 'ReportHere',
    publishedTime,
    modifiedTime
  }) {
    // Update title
    if (title) {
      document.title = `${title} | ReportHere - Consumer Complaint Platform`;
      this.updateMetaTag('og:title', title);
      this.updateMetaTag('twitter:title', title);
    }

    // Update description
    if (description) {
      this.updateMetaTag('description', description);
      this.updateMetaTag('og:description', description);
      this.updateMetaTag('twitter:description', description);
    }

    // Update image
    if (image) {
      this.updateMetaTag('og:image', image);
      this.updateMetaTag('twitter:image', image);
    }

    // Update URL
    if (url) {
      this.updateMetaTag('og:url', url);
      this.updateMetaTag('twitter:url', url);
      this.updateLinkTag('canonical', url);
    }

    // Update type
    this.updateMetaTag('og:type', type);

    // Update keywords
    if (keywords.length > 0) {
      this.updateMetaTag('keywords', keywords.join(', '));
    }

    // Update author
    if (author) {
      this.updateMetaTag('author', author);
    }

    // Update published/modified times
    if (publishedTime) {
      this.updateMetaTag('article:published_time', publishedTime);
    }
    if (modifiedTime) {
      this.updateMetaTag('article:modified_time', modifiedTime);
    }

    // Twitter card type
    this.updateMetaTag('twitter:card', 'summary_large_image');
    this.updateMetaTag('twitter:site', '@ReportHereUSA');
  },

  /**
   * Update or create a meta tag
   * @param {string} name - Meta tag name or property
   * @param {string} content - Meta tag content
   */
  updateMetaTag(name, content) {
    if (!content) return;

    // Check if it's a property (og:, twitter:) or name
    const isProperty = name.startsWith('og:') || name.startsWith('twitter:') || name.startsWith('article:');
    const attribute = isProperty ? 'property' : 'name';
    const selector = `meta[${attribute}="${name}"]`;

    let meta = document.querySelector(selector);
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  },

  /**
   * Update or create a link tag
   * @param {string} rel - Link relation
   * @param {string} href - Link href
   */
  updateLinkTag(rel, href) {
    if (!href) return;

    let link = document.querySelector(`link[rel="${rel}"]`);
    
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    
    link.setAttribute('href', href);
  },

  /**
   * Generate SEO-friendly meta tags for a complaint page
   * @param {Object} complaint - Complaint object
   * @param {Object} company - Company object
   */
  generateComplaintMeta(complaint, company) {
    // Wave 2.3: Neutral social sharing language
    const title = `A consumer shared an experience with ${company.name}`;
    const description = `Consumer feedback about ${company.name}. This reflects the user's personal experience and is not verified by ReportHere.`;
    const url = `${window.location.origin}/complaint/${complaint.id}`;
    const keywords = [
      company.name,
      'consumer experience',
      'customer feedback',
      complaint.category,
      'consumer rights'
    ];

    this.updateMetaTags({
      title,
      description,
      url,
      type: 'article',
      keywords,
      publishedTime: complaint.created_at,
      modifiedTime: complaint.updated_at,
      image: 'https://www.reporthere.org/og-complaint.png' // Default OG image
    });

    // Add structured data for complaint
    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Review',
      'itemReviewed': {
        '@type': 'Organization',
        'name': company.name,
        'url': company.website
      },
      'author': {
        '@type': 'Person',
        'name': complaint.user_name || 'Anonymous'
      },
      'datePublished': complaint.created_at,
      'reviewBody': complaint.description,
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': this.getSentimentRating(complaint.sentiment),
        'worstRating': 1,
        'bestRating': 5
      }
    });
  },

  /**
   * Generate SEO-friendly meta tags for a company page
   * @param {Object} company - Company object
   * @param {Object} stats - Company statistics
   */
  generateCompanyMeta(company, stats = {}) {
    const title = `${company.name} - Customer Complaints & Reviews`;
    const description = `View ${stats.total_complaints || 0} customer complaints about ${company.name}. ${company.description || ''}`.substring(0, 155);
    const url = `${window.location.origin}/company/${company.slug}`;
    const keywords = [
      company.name,
      'complaints',
      'reviews',
      'customer feedback',
      company.industry,
      'consumer rights'
    ];

    this.updateMetaTags({
      title,
      description,
      url,
      type: 'website',
      keywords,
      image: company.logo_url || 'https://www.reporthere.org/og-company.png'
    });

    // Add structured data for company
    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': company.name,
      'url': company.website,
      'description': company.description,
      'aggregateRating': stats.average_rating ? {
        '@type': 'AggregateRating',
        'ratingValue': stats.average_rating,
        'reviewCount': stats.total_complaints,
        'worstRating': 1,
        'bestRating': 5
      } : undefined
    });
  },

  /**
   * Add structured data (JSON-LD) to page
   * @param {Object} data - Structured data object
   */
  addStructuredData(data) {
    // Remove existing structured data
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  },

  /**
   * Convert sentiment to rating (1-5)
   * @param {string} sentiment - Sentiment value
   * @returns {number} Rating value
   */
  getSentimentRating(sentiment) {
    const ratings = {
      'very_satisfied': 5,
      'satisfied': 4,
      'neutral': 3,
      'disappointed': 2,
      'very_disappointed': 1,
      'angry': 1
    };
    return ratings[sentiment] || 3;
  },

  /**
   * Generate sitemap-friendly URL list
   * @param {Array} complaints - Array of complaints
   * @param {Array} companies - Array of companies
   * @returns {Array} Array of URL objects
   */
  generateSitemapUrls(complaints = [], companies = []) {
    const baseUrl = window.location.origin;
    const urls = [];

    // Static pages
    urls.push(
      { loc: baseUrl, priority: 1.0, changefreq: 'daily' },
      { loc: `${baseUrl}/complaints`, priority: 0.9, changefreq: 'daily' },
      { loc: `${baseUrl}/companies`, priority: 0.9, changefreq: 'daily' },
      { loc: `${baseUrl}/about`, priority: 0.5, changefreq: 'monthly' },
      { loc: `${baseUrl}/contact`, priority: 0.5, changefreq: 'monthly' },
      { loc: `${baseUrl}/privacy`, priority: 0.3, changefreq: 'yearly' },
      { loc: `${baseUrl}/terms`, priority: 0.3, changefreq: 'yearly' }
    );

    // Complaint pages
    complaints.forEach(complaint => {
      urls.push({
        loc: `${baseUrl}/complaint/${complaint.id}`,
        lastmod: complaint.updated_at,
        priority: 0.7,
        changefreq: 'weekly'
      });
    });

    // Company pages
    companies.forEach(company => {
      urls.push({
        loc: `${baseUrl}/company/${company.slug}`,
        lastmod: company.updated_at,
        priority: 0.8,
        changefreq: 'weekly'
      });
    });

    return urls;
  }
};

export default SEO;
