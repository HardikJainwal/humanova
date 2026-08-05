/**
 * Centralized JSON-LD Schema Registry for Humanova
 */

export const SERVICES_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://humanova.live/services#collectionpage",
      "url": "https://humanova.live/services",
      "name": "Humanova Services",
      "description": "Explore Humanova's AI-powered corporate wellbeing solutions including workplace wellbeing tracking, employee engagement analytics, coaching, HR analytics, attendance intelligence, AI recommendations, and learning support.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/#organization"
      },
      "mainEntity": {
        "@id": "https://humanova.live/services#itemlist"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/services#breadcrumb"
      },
      "inLanguage": "en"
    },
    {
      "@type": "ItemList",
      "@id": "https://humanova.live/services#itemlist",
      "name": "Humanova Services",
      "numberOfItems": 7,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": "https://humanova.live/services/workplace-wellbeing-tracking",
          "name": "Workplace Wellbeing Tracking"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "url": "https://humanova.live/services/employee-engagement-analytics",
          "name": "Employee Engagement Analytics"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "url": "https://humanova.live/services/employee-coaching-support",
          "name": "Employee Coaching & 1:1 Support"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "url": "https://humanova.live/services/hr-analytics-workforce-insights",
          "name": "HR Analytics & Workforce Insights"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "url": "https://humanova.live/services/leave-attendance-shift-intelligence",
          "name": "Leave, Attendance & Shift Intelligence"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "url": "https://humanova.live/services/ai-based-recommendations",
          "name": "AI-Based Recommendations"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "url": "https://humanova.live/services/learning-capability-support",
          "name": "Learning & Capability Support"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://humanova.live/services#webpage",
      "url": "https://humanova.live/services",
      "name": "Corporate Wellbeing Services | Humanova",
      "description": "Discover Humanova's AI-powered corporate wellbeing services including employee wellbeing tracking, engagement analytics, coaching, HR insights, AI recommendations, and workforce intelligence.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/#organization"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/services#breadcrumb"
      },
      "mainEntity": {
        "@id": "https://humanova.live/services#itemlist"
      },
      "inLanguage": "en"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://humanova.live/services#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://humanova.live/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://humanova.live/services"
        }
      ]
    }
  ]
};

export const WORKPLACE_WELLBEING_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://humanova.live/services/workplace-wellbeing-tracking#service",
      "name": "Workplace Wellbeing Tracking",
      "description": "Humanova's Workplace Wellbeing Tracking helps organizations continuously monitor employee wellbeing through anonymous check-ins, AI-powered insights, burnout risk detection, mood tracking, and actionable HR recommendations.",
      "url": "https://humanova.live/services/workplace-wellbeing-tracking",
      "serviceType": "Workplace Wellbeing Tracking",
      "provider": {
        "@id": "https://humanova.live/#organization"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HR Leaders, HR Managers, CHROs, Founders, Business Owners, People & Culture Teams"
      },
      "category": "Corporate Wellbeing Platform",
      "offers": {
        "@type": "Offer",
        "url": "https://humanova.live/services/workplace-wellbeing-tracking",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://humanova.live/services/workplace-wellbeing-tracking#webpage",
      "url": "https://humanova.live/services/workplace-wellbeing-tracking",
      "name": "Workplace Wellbeing Tracking | Humanova",
      "description": "Monitor employee wellbeing with Humanova's Workplace Wellbeing Tracking. Detect burnout early, track wellbeing trends, and help HR teams create healthier workplaces.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/services/workplace-wellbeing-tracking#service"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/services/workplace-wellbeing-tracking#breadcrumb"
      },
      "inLanguage": "en"
    },
    {
      "@type": "FAQPage",
      "@id": "https://humanova.live/services/workplace-wellbeing-tracking#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is workplace wellbeing tracking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Workplace wellbeing tracking is the continuous process of monitoring employee wellbeing through regular check-ins, wellbeing assessments, and trend analysis. It helps organizations understand employee experiences and provide support before issues become larger challenges."
          }
        },
        {
          "@type": "Question",
          "name": "How often should employees complete wellbeing check-ins?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most organizations benefit from short weekly or bi-weekly check-ins. Regular participation provides more accurate wellbeing trends while keeping the process simple and manageable for employees."
          }
        },
        {
          "@type": "Question",
          "name": "Is employee wellbeing data anonymous?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova uses anonymous wellbeing tracking to protect employee privacy. HR teams receive aggregated insights rather than individual responses, encouraging honest and trustworthy participation."
          }
        },
        {
          "@type": "Question",
          "name": "Can managers identify individual employees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Humanova focuses on team-level wellbeing insights instead of individual monitoring. Managers see overall trends that help them improve workplace wellbeing without accessing personal employee responses."
          }
        },
        {
          "@type": "Question",
          "name": "How does Humanova identify burnout risks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Humanova analyzes ongoing wellbeing patterns, including changes in mood, stress levels, motivation, and engagement. These trends help identify potential burnout risks early, allowing organizations to provide proactive support."
          }
        },
        {
          "@type": "Question",
          "name": "Is workplace wellbeing tracking suitable for remote and hybrid teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Workplace wellbeing tracking is especially valuable for remote and hybrid work environments, where managers may have fewer opportunities to observe employee wellbeing directly. Regular digital check-ins help maintain connection and visibility across distributed teams."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can Humanova be implemented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Implementation timelines vary depending on the organization's size and requirements. However, Humanova is designed for a straightforward onboarding process, enabling organizations to begin collecting meaningful wellbeing insights within a short period."
          }
        },
        {
          "@type": "Question",
          "name": "How does workplace wellbeing tracking improve employee retention?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "By identifying wellbeing concerns early and helping organizations respond with meaningful support, workplace wellbeing tracking improves employee satisfaction, strengthens workplace culture, and reduces the likelihood of burnout and voluntary turnover."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://humanova.live/services/workplace-wellbeing-tracking#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://humanova.live/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://humanova.live/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Workplace Wellbeing Tracking",
          "item": "https://humanova.live/services/workplace-wellbeing-tracking"
        }
      ]
    }
  ]
};

export const EMPLOYEE_ENGAGEMENT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://humanova.live/services/employee-engagement-analytics#service",
      "name": "Employee Engagement Analytics",
      "description": "Humanova's Employee Engagement Analytics provides real-time team sentiment analysis, pulse surveys, engagement trend tracking, and data-driven HR insights to boost morale and retention.",
      "url": "https://humanova.live/services/employee-engagement-analytics",
      "serviceType": "Employee Engagement Analytics",
      "provider": {
        "@id": "https://humanova.live/#organization"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HR Leaders, HR Managers, CHROs, Founders, Business Owners, People & Culture Teams"
      },
      "category": "Corporate Wellbeing Platform",
      "offers": {
        "@type": "Offer",
        "url": "https://humanova.live/services/employee-engagement-analytics",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://humanova.live/services/employee-engagement-analytics#webpage",
      "url": "https://humanova.live/services/employee-engagement-analytics",
      "name": "Employee Engagement Analytics | Humanova",
      "description": "Transform workplace culture with Humanova's Employee Engagement Analytics. Understand engagement drivers, track pulse trends, and empower HR leadership.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/services/employee-engagement-analytics#service"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/services/employee-engagement-analytics#breadcrumb"
      },
      "inLanguage": "en"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://humanova.live/services/employee-engagement-analytics#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://humanova.live/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://humanova.live/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Employee Engagement Analytics",
          "item": "https://humanova.live/services/employee-engagement-analytics"
        }
      ]
    }
  ]
};

export const EMPLOYEE_COACHING_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://humanova.live/services/employee-coaching-support#service",
      "name": "Employee Coaching & 1:1 Support",
      "description": "Humanova's Employee Coaching & 1:1 Support helps organizations improve employee wellbeing, leadership development, workplace resilience, and performance through confidential coaching, wellbeing support, and personalized development programs.",
      "url": "https://humanova.live/services/employee-coaching-support",
      "serviceType": "Employee Coaching & 1:1 Support",
      "provider": {
        "@id": "https://humanova.live/#organization"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HR Leaders, HR Managers, CHROs, Founders, Business Owners, People & Culture Teams"
      },
      "category": "Corporate Wellbeing Platform",
      "offers": {
        "@type": "Offer",
        "url": "https://humanova.live/services/employee-coaching-support",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://humanova.live/services/employee-coaching-support#webpage",
      "url": "https://humanova.live/services/employee-coaching-support",
      "name": "Employee Coaching & 1:1 Support | Humanova",
      "description": "Empower employees with confidential coaching, leadership development, wellbeing support, and personalized growth plans through Humanova's Employee Coaching & 1:1 Support.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/services/employee-coaching-support#service"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/services/employee-coaching-support#breadcrumb"
      },
      "inLanguage": "en"
    },
    {
      "@type": "FAQPage",
      "@id": "https://humanova.live/services/employee-coaching-support#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Employee Coaching & 1:1 Support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Employee Coaching & 1:1 Support provides employees with confidential coaching sessions that help improve workplace performance, leadership skills, resilience, emotional wellbeing, and professional development through personalized guidance."
          }
        },
        {
          "@type": "Question",
          "name": "How does workplace coaching help employees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Workplace coaching helps employees improve communication, confidence, decision-making, stress management, leadership abilities, and career growth while supporting overall wellbeing and workplace performance."
          }
        },
        {
          "@type": "Question",
          "name": "Are coaching sessions confidential?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova maintains complete confidentiality during coaching sessions. Individual conversations remain private while HR teams receive only anonymous program-level insights."
          }
        },
        {
          "@type": "Question",
          "name": "Who can access coaching through Humanova?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Employee coaching is available for employees, managers, team leaders, executives, and leadership teams based on an organization's coaching and wellbeing programs."
          }
        },
        {
          "@type": "Question",
          "name": "Can organizations offer group coaching sessions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova provides both one-to-one coaching and group wellbeing sessions that encourage collaboration, resilience, communication, and team development."
          }
        },
        {
          "@type": "Question",
          "name": "Is coaching suitable for remote employees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova supports office-based, remote, and hybrid employees through secure virtual coaching sessions that are accessible from anywhere."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can employees begin coaching?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Implementation timelines vary by organization, but Humanova is designed for quick onboarding, allowing employees to access coaching services within a short period after deployment."
          }
        },
        {
          "@type": "Question",
          "name": "How does Humanova measure coaching outcomes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Humanova measures coaching outcomes using anonymous engagement insights, wellbeing trends, participation data, and workforce analytics that help organizations evaluate the impact of coaching initiatives."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://humanova.live/services/employee-coaching-support#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://humanova.live/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://humanova.live/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Employee Coaching & 1:1 Support",
          "item": "https://humanova.live/services/employee-coaching-support"
        }
      ]
    }
  ]
};

export const HR_ANALYTICS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://humanova.live/services/hr-analytics-workforce-insights#service",
      "name": "HR Analytics & Workforce Insights",
      "description": "Humanova's HR Analytics & Workforce Insights helps organizations make data-driven HR decisions through real-time dashboards, workforce analytics, employee wellbeing insights, AI-powered recommendations, and actionable reports.",
      "url": "https://humanova.live/services/hr-analytics-workforce-insights",
      "serviceType": "HR Analytics & Workforce Insights",
      "provider": {
        "@id": "https://humanova.live/#organization"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HR Leaders, HR Managers, CHROs, Founders, Business Owners, People & Culture Teams"
      },
      "category": "Corporate Wellbeing Platform",
      "offers": {
        "@type": "Offer",
        "url": "https://humanova.live/services/hr-analytics-workforce-insights",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://humanova.live/services/hr-analytics-workforce-insights#webpage",
      "url": "https://humanova.live/services/hr-analytics-workforce-insights",
      "name": "HR Analytics & Workforce Insights | Humanova",
      "description": "Gain real-time HR dashboards, workforce insights, AI-powered analytics, and actionable recommendations to improve employee wellbeing and organizational performance.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/services/hr-analytics-workforce-insights#service"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/services/hr-analytics-workforce-insights#breadcrumb"
      },
      "inLanguage": "en"
    },
    {
      "@type": "FAQPage",
      "@id": "https://humanova.live/services/hr-analytics-workforce-insights#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is HR Analytics & Workforce Insights?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HR Analytics & Workforce Insights is the process of collecting, analyzing, and interpreting workforce data to help organizations make informed HR decisions, improve employee wellbeing, strengthen engagement, and enhance business performance."
          }
        },
        {
          "@type": "Question",
          "name": "How does HR analytics improve decision-making?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HR analytics provides real-time insights into employee wellbeing, engagement, attendance, workforce trends, and productivity, enabling HR leaders to make evidence-based decisions instead of relying on assumptions."
          }
        },
        {
          "@type": "Question",
          "name": "What data does Humanova analyze?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Humanova analyzes employee wellbeing, engagement, attendance, participation, workforce trends, feedback, and organizational performance data to provide meaningful HR insights and recommendations."
          }
        },
        {
          "@type": "Question",
          "name": "Is employee information anonymous?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova follows a privacy-first approach by analyzing workforce data anonymously. HR teams receive aggregated insights without access to individual employee responses."
          }
        },
        {
          "@type": "Question",
          "name": "Can managers view department-level reports?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova provides department-level dashboards and workforce reports that help managers understand trends while protecting employee privacy."
          }
        },
        {
          "@type": "Question",
          "name": "How do workforce insights improve productivity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Workforce insights identify engagement patterns, wellbeing trends, attendance issues, and performance opportunities, allowing organizations to improve productivity through proactive decision-making."
          }
        },
        {
          "@type": "Question",
          "name": "Is Humanova suitable for large organizations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova is designed for startups, SMEs, and enterprises. Its scalable dashboards and workforce analytics support organizations of all sizes."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can HR dashboards be implemented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Implementation depends on organizational requirements, but Humanova offers a streamlined onboarding process that enables HR teams to begin accessing workforce dashboards and insights within a short period."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://humanova.live/services/hr-analytics-workforce-insights#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://humanova.live/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://humanova.live/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "HR Analytics & Workforce Insights",
          "item": "https://humanova.live/services/hr-analytics-workforce-insights"
        }
      ]
    }
  ]
};

export const LEAVE_ATTENDANCE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://humanova.live/services/leave-attendance-shift-intelligence#service",
      "name": "Leave, Attendance & Shift Intelligence",
      "description": "Humanova's Leave, Attendance & Shift Intelligence helps organizations optimize workforce planning through intelligent leave management, attendance tracking, shift analytics, absenteeism insights, and AI-powered workforce recommendations.",
      "url": "https://humanova.live/services/leave-attendance-shift-intelligence",
      "serviceType": "Leave, Attendance & Shift Intelligence",
      "provider": {
        "@id": "https://humanova.live/#organization"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HR Leaders, HR Managers, CHROs, Founders, Business Owners, People & Culture Teams"
      },
      "category": "Corporate Wellbeing Platform",
      "offers": {
        "@type": "Offer",
        "url": "https://humanova.live/services/leave-attendance-shift-intelligence",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://humanova.live/services/leave-attendance-shift-intelligence#webpage",
      "url": "https://humanova.live/services/leave-attendance-shift-intelligence",
      "name": "Leave, Attendance & Shift Intelligence | Humanova",
      "description": "Track attendance, manage leave, optimize shift planning, identify absenteeism trends, and improve workforce wellbeing with Humanova's AI-powered workforce intelligence platform.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/services/leave-attendance-shift-intelligence#service"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/services/leave-attendance-shift-intelligence#breadcrumb"
      },
      "inLanguage": "en"
    },
    {
      "@type": "FAQPage",
      "@id": "https://humanova.live/services/leave-attendance-shift-intelligence#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Leave, Attendance & Shift Intelligence?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Leave, Attendance & Shift Intelligence is an AI-powered workforce management solution that combines leave tracking, attendance monitoring, shift analytics, and workforce insights to improve productivity, employee wellbeing, and HR decision-making."
          }
        },
        {
          "@type": "Question",
          "name": "How does attendance analytics improve workforce planning?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Attendance analytics helps HR teams identify attendance patterns, staffing gaps, absenteeism trends, and workforce availability so organizations can optimize schedules and improve operational efficiency."
          }
        },
        {
          "@type": "Question",
          "name": "Can Humanova identify absenteeism trends?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova continuously analyzes attendance and leave data to identify recurring absenteeism patterns, enabling HR teams to take proactive action before attendance issues impact business performance."
          }
        },
        {
          "@type": "Question",
          "name": "How does shift intelligence support employee wellbeing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Shift intelligence identifies workload imbalances, overtime, fatigue risks, and scheduling trends to help organizations create healthier work schedules and improve employee wellbeing."
          }
        },
        {
          "@type": "Question",
          "name": "Is employee attendance data secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova protects attendance and workforce data using enterprise-grade security and privacy standards, ensuring employee information remains confidential and secure."
          }
        },
        {
          "@type": "Question",
          "name": "Can managers view department-level attendance insights?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Managers can access department-level attendance dashboards and workforce analytics that provide meaningful insights while maintaining employee privacy."
          }
        },
        {
          "@type": "Question",
          "name": "Is Humanova suitable for organizations with shift-based work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova supports fixed, rotating, flexible, and multi-location shift schedules, making it suitable for healthcare, manufacturing, retail, IT, and other shift-based industries."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can Leave, Attendance & Shift Intelligence be implemented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Implementation depends on organizational requirements, but Humanova is designed for quick onboarding, allowing organizations to begin using attendance dashboards, leave management, and workforce insights within a short period."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://humanova.live/services/leave-attendance-shift-intelligence#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://humanova.live/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://humanova.live/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Leave, Attendance & Shift Intelligence",
          "item": "https://humanova.live/services/leave-attendance-shift-intelligence"
        }
      ]
    }
  ]
};

export const AI_RECOMMENDATIONS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://humanova.live/services/ai-based-recommendations#service",
      "name": "AI-Based Recommendations",
      "description": "Humanova's AI-Based Recommendations helps HR teams make proactive, data-driven decisions through intelligent workforce insights, personalized recommendations, burnout detection, and actionable team plans.",
      "url": "https://humanova.live/services/ai-based-recommendations",
      "serviceType": "AI-Based Recommendations",
      "provider": {
        "@id": "https://humanova.live/#organization"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HR Leaders, HR Managers, CHROs, Founders, Business Owners, People & Culture Teams"
      },
      "category": "Corporate Wellbeing Platform",
      "offers": {
        "@type": "Offer",
        "url": "https://humanova.live/services/ai-based-recommendations",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://humanova.live/services/ai-based-recommendations#webpage",
      "url": "https://humanova.live/services/ai-based-recommendations",
      "name": "AI-Based Recommendations | Humanova",
      "description": "Use AI-powered workforce recommendations to improve employee wellbeing, engagement, productivity, and HR decision-making with Humanova.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/services/ai-based-recommendations#service"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/services/ai-based-recommendations#breadcrumb"
      },
      "inLanguage": "en"
    },
    {
      "@type": "FAQPage",
      "@id": "https://humanova.live/services/ai-based-recommendations#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are AI-Based Recommendations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI-Based Recommendations are intelligent suggestions generated by artificial intelligence after analyzing employee wellbeing, engagement, attendance, participation, and workforce trends. They help HR teams make faster, data-driven decisions."
          }
        },
        {
          "@type": "Question",
          "name": "How does Humanova generate AI recommendations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Humanova securely collects anonymous workforce data from wellbeing assessments, engagement activities, attendance records, surveys, and workplace interactions. AI analyzes these trends to generate personalized recommendations, risk alerts, and action plans."
          }
        },
        {
          "@type": "Question",
          "name": "What types of recommendations does Humanova provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Humanova recommends employee coaching, wellbeing programs, learning resources, manager check-ins, communication improvements, engagement initiatives, and team action plans based on workforce insights."
          }
        },
        {
          "@type": "Question",
          "name": "Are AI recommendations based on anonymous data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova follows a privacy-first approach by anonymizing workforce data before analysis. HR teams receive aggregated recommendations while employee identities remain protected."
          }
        },
        {
          "@type": "Question",
          "name": "How do AI recommendations improve employee wellbeing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI recommendations identify early signs of stress, burnout, disengagement, and other workforce challenges, allowing organizations to provide timely wellbeing support and proactive interventions."
          }
        },
        {
          "@type": "Question",
          "name": "Can managers customize recommended action plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Managers can tailor Humanova's recommended action plans to match team priorities, organizational goals, and available wellbeing resources."
          }
        },
        {
          "@type": "Question",
          "name": "What is the NOVA Score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The NOVA Score is Humanova's workforce wellbeing indicator that combines multiple employee signals to measure overall organizational wellbeing and monitor progress over time."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can organizations start using AI-Based Recommendations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Humanova offers a simple onboarding process that enables organizations to begin using AI-Based Recommendations within a short implementation period, depending on business requirements."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://humanova.live/services/ai-based-recommendations#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://humanova.live/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://humanova.live/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI-Based Recommendations",
          "item": "https://humanova.live/services/ai-based-recommendations"
        }
      ]
    }
  ]
};

export const LEARNING_CAPABILITY_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://humanova.live/services/learning-capability-support#service",
      "name": "Learning & Capability Support",
      "description": "Humanova's Learning & Capability Support helps organizations build a culture of continuous learning through personalized learning journeys, skill development, progress tracking, and AI-powered capability insights.",
      "url": "https://humanova.live/services/learning-capability-support",
      "serviceType": "Learning & Capability Support",
      "provider": {
        "@id": "https://humanova.live/#organization"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "HR Leaders, HR Managers, CHROs, Founders, Business Owners, People & Culture Teams"
      },
      "category": "Corporate Wellbeing Platform",
      "offers": {
        "@type": "Offer",
        "url": "https://humanova.live/services/learning-capability-support",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://humanova.live/services/learning-capability-support#webpage",
      "url": "https://humanova.live/services/learning-capability-support",
      "name": "Learning & Capability Support | Humanova",
      "description": "Develop employee skills with Humanova's Learning & Capability Support. Deliver personalized learning, track progress, and build a future-ready workforce.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/services/learning-capability-support#service"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/services/learning-capability-support#breadcrumb"
      },
      "inLanguage": "en"
    },
    {
      "@type": "FAQPage",
      "@id": "https://humanova.live/services/learning-capability-support#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Learning & Capability Support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Learning & Capability Support is a continuous employee development solution that provides personalized learning resources, skill-building content, assignments, and progress tracking to help employees improve workplace performance and achieve long-term career growth."
          }
        },
        {
          "@type": "Question",
          "name": "How does Humanova support employee learning?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Humanova supports employee learning through personalized learning journeys, resource libraries, videos, podcasts, articles, practical exercises, and progress tracking. The platform helps employees develop professional and wellbeing skills while supporting organizational learning goals."
          }
        },
        {
          "@type": "Question",
          "name": "What learning resources are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Humanova provides articles, videos, podcasts, learning assignments, interactive exercises, professional development guides, leadership content, and wellbeing resources that support continuous employee growth."
          }
        },
        {
          "@type": "Question",
          "name": "Can employees learn at their own pace?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova offers flexible, self-paced learning that allows employees to access learning content whenever it fits their schedule, whether they work remotely, in the office, or in a hybrid environment."
          }
        },
        {
          "@type": "Question",
          "name": "How is learning progress tracked?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Humanova automatically tracks assignment completion, learning participation, development milestones, and overall progress through intuitive dashboards for employees, managers, and HR teams."
          }
        },
        {
          "@type": "Question",
          "name": "Is Learning & Capability Support suitable for remote teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Humanova is designed for office-based, remote, and hybrid teams, enabling employees to access learning resources from anywhere while HR teams monitor progress through centralized dashboards."
          }
        },
        {
          "@type": "Question",
          "name": "Can HR assign personalized learning journeys?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. HR teams and managers can assign customized learning pathways based on employee roles, career goals, skill gaps, and organizational priorities to support meaningful professional development."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can organizations implement Learning & Capability Support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Humanova is designed for fast implementation and simple onboarding. Most organizations can begin delivering personalized learning experiences within a short setup period."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://humanova.live/services/learning-capability-support#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://humanova.live/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://humanova.live/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Learning & Capability Support",
          "item": "https://humanova.live/services/learning-capability-support"
        }
      ]
    }
  ]
};

export const ABOUT_US_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://humanova.live/aboutUs#aboutpage",
      "url": "https://humanova.live/aboutUs",
      "name": "About Humanova",
      "description": "Learn about Humanova's mission to transform workplace wellbeing through AI-powered technology, human expertise, leadership development, coaching, and workforce resilience.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/#organization"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/aboutUs#breadcrumb"
      },
      "inLanguage": "en"
    },
    {
      "@type": "Organization",
      "@id": "https://humanova.live/#organization",
      "name": "Humanova",
      "url": "https://humanova.live/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://humanova.live/logo.png"
      },
      "description": "Humanova is an AI-powered Corporate Wellbeing Platform that helps organizations improve employee wellbeing, leadership, engagement, coaching, and workforce performance through integrated human-led and technology-enabled solutions.",
      "email": "support@humanova.live",
      "telephone": "+91 84440 74642",
      "foundingLocation": {
        "@type": "Place",
        "name": "New Delhi, India"
      },
      "sameAs": [
        "https://www.linkedin.com/company/humanovabydevdoot/",
        "https://www.instagram.com/humanova_official/"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://humanova.live/aboutUs#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://humanova.live/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About Us",
          "item": "https://humanova.live/aboutUs"
        }
      ]
    }
  ]
};

export const PRICING_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://humanova.live/pricing#webpage",
      "url": "https://humanova.live/pricing",
      "name": "Pricing | Humanova",
      "description": "Explore Humanova's flexible pricing options for our AI-powered Corporate Wellbeing Platform. Find the right plan for your organization and request a personalized demo.",
      "isPartOf": {
        "@id": "https://humanova.live/#website"
      },
      "about": {
        "@id": "https://humanova.live/#organization"
      },
      "breadcrumb": {
        "@id": "https://humanova.live/pricing#breadcrumb"
      },
      "inLanguage": "en"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://humanova.live/pricing#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://humanova.live/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Pricing",
          "item": "https://humanova.live/pricing"
        }
      ]
    }
  ]
};
