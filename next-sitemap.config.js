/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://atlanticcatering-gh.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/server-sitemap.xml', '/test', '/test/**'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/_next/', '/static/', '/test/', '/private/'] },
    ],
    additionalSitemaps: ['https://atlanticcatering-gh.com/sitemap-index.xml'],
  },
  transform: async (config, path) => {
    const priorityMap = {
      '/': 1.0,
      '/about': 0.9,
      '/services': 0.9,
      '/contact': 0.9,
      '/expertise': 0.8,
      '/sustainability': 0.8,
      '/impact': 0.8,
      '/portfolio': 0.8,
      '/news-updates': 0.7,
    };

    const changeFreqMap = {
      '/': 'weekly',
      '/about': 'monthly',
      '/services': 'monthly',
      '/contact': 'monthly',
      '/expertise': 'monthly',
      '/sustainability': 'monthly',
      '/impact': 'monthly',
      '/portfolio': 'monthly',
      '/news-updates': 'weekly',
    };

    return {
      loc: path,
      changefreq: changeFreqMap[path] || 'monthly',
      priority: priorityMap[path] || 0.5,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};

export default config;