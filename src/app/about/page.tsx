"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Database, 
  Brain,
  Trophy,
  MapPin,
  Mail,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Coffee,
  Rocket
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Experience {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
  icon: React.ReactNode
  link?: {
    url: string
    text: string
  }
}

interface Education {
  degree: string
  institution: string
  period: string
  description: string
  icon: React.ReactNode
}

interface Skill {
  category: string
  skills: string[]
  icon: React.ReactNode
  color: string
}

export default function AboutPage() {
  const experiences: Experience[] = [
    {
      title: "Senior Tax Technology Consultant",
      company: "Financial Services Innovation",
      period: "2022 - Present",
      description: "Leading AI automation initiatives for tax compliance and research processes. Developed strategic solutions for reducing manual tax research time by 75-85% through intelligent document processing and RAG-based search systems.",
      technologies: ["AI/ML", "Python", "RAG Systems", "Document Processing", "Tax Compliance"],
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: "AI Implementation Lead",
      company: "CIBC - Canadian Imperial Bank of Commerce",
      period: "2021 - 2022",
      description: "Played a major role in the launch and scaling of CIBC's internal Enterprise Generative AI tool, successfully expanding adoption from 500 employees to over 10,000 users. Led cross-functional teams in AI strategy, user training, and enterprise-wide rollout initiatives.",
      technologies: ["Enterprise AI", "Change Management", "User Adoption", "AI Strategy", "Banking Operations"],
      icon: <Rocket className="w-5 h-5" />,
      link: {
        url: "https://www.cibc.com/en/about-cibc/future-banking/ai/enterprise-generative-ai.html",
        text: "Read about CIBC's Enterprise AI Initiative"
      }
    },
    {
      title: "Tax Systems Developer",
      company: "Enterprise Solutions Inc.",
      period: "2020 - 2022",
      description: "Built comprehensive tax calculation and compliance systems. Specialized in creating automated workflows for complex tax scenarios and regulatory change management.",
      technologies: ["React", "Node.js", "PostgreSQL", "REST APIs", "Tax Regulations"],
      icon: <Code2 className="w-5 h-5" />
    },
    {
      title: "Business Analyst - Tax Operations",
      company: "Major Banking Institution",
      period: "2018 - 2020",
      description: "Analyzed tax workflow bottlenecks and identified automation opportunities. Created detailed process maps and ROI analyses for technology implementations.",
      technologies: ["Process Analysis", "SQL", "Data Visualization", "Business Intelligence"],
      icon: <Briefcase className="w-5 h-5" />
    }
  ]

  const education: Education[] = [
    {
      degree: "Master of Science in Information Systems",
      institution: "University of Technology",
      period: "2016 - 2018",
      description: "Specialized in database systems and business process automation. Thesis focused on AI applications in financial services.",
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      degree: "Bachelor of Business Administration",
      institution: "State University",
      period: "2012 - 2016",
      description: "Concentration in Finance and Information Technology. Dean's List recognition for academic excellence.",
      icon: <Trophy className="w-5 h-5" />
    }
  ]

  const skills: Skill[] = [
    {
      category: "AI & Machine Learning",
      skills: ["RAG Systems", "LLM Integration", "Document Processing", "Embeddings", "OpenAI APIs"],
      icon: <Brain className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
    },
    {
      category: "Development",
      skills: ["TypeScript", "React", "Next.js", "Node.js", "Python", "SQL"],
      icon: <Code2 className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
    },
    {
      category: "Tax Technology",
      skills: ["Tax Compliance", "Regulatory Analysis", "Process Automation", "Risk Assessment"],
      icon: <Database className="w-5 h-5" />,
      color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:20px_20px] opacity-30" />
      
      <div className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full mx-auto flex items-center justify-center shadow-xl">
                <User className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Coffee className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Robert Mill
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Senior Tax Technology Consultant & AI Solutions Architect
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>6+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Rocket className="w-4 h-4" />
                <span>AI Innovation Specialist</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <User className="w-5 h-5" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I&apos;m a passionate technology consultant specializing in AI-driven solutions for tax and financial services. 
                  With over 6 years of experience in tax operations and technology, I focus on transforming manual, 
                  time-intensive processes into efficient, automated workflows.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  My expertise lies in identifying strategic automation opportunities, particularly in tax research and 
                  compliance functions. I&apos;ve successfully implemented RAG-based search systems that reduce research time 
                  by 75-85%, enabling tax professionals to focus on high-value advisory work rather than manual document processing.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I believe in the power of thoughtful AI implementation—not replacing human expertise, but amplifying it 
                  through intelligent automation and strategic technology integration.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        {exp.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {exp.title}
                          </h3>
                          <Badge variant="outline" className="text-xs w-fit">
                            {exp.period}
                          </Badge>
                        </div>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                          {exp.company}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                          {exp.description}
                        </p>
                        {exp.link && (
                          <div className="mb-4">
                            <a 
                              href={exp.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors text-sm font-medium group"
                            >
                              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              {exp.link.text}
                            </a>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-green-600" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                        {edu.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {edu.degree}
                          </h3>
                          <Badge variant="outline" className="text-xs w-fit">
                            {edu.period}
                          </Badge>
                        </div>
                        <p className="text-green-600 dark:text-green-400 font-medium mb-3">
                          {edu.institution}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-purple-600" />
              Technical Skills
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.map((skillGroup, index) => (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <div className={`p-2 rounded-lg ${skillGroup.color}`}>
                        {skillGroup.icon}
                      </div>
                      <span className="text-sm">{skillGroup.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Let&apos;s Connect
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  Interested in discussing AI automation opportunities in tax and financial services? 
                  I&apos;d love to connect and explore how strategic technology implementation can transform 
                  your organization&apos;s efficiency.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Get In Touch
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  )
}