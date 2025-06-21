"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useClientTheme } from "@/hooks/use-theme";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function Portfolio() {
  const { theme, toggleTheme, mounted } = useClientTheme();
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const validateForm = () => {
    const errors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Check for required environment variables
      const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
      const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

      if (!serviceID || !templateID || !publicKey) {
        console.error("Missing EmailJS environment variables.");
        toast.error("Email service is not configured properly.");
        return;
      }

      emailjs
        .send(
          serviceID,
          templateID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          publicKey
        )
        .then(
          (result) => {
            console.log("Email sent", result.text);
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
          },
          (error) => {
            console.error("Error sending message:", error);
            toast.error("Failed to send message. Try again later.");
          }
        );
    }
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      image: "/ecommerce.png",
      demo: "#",
      github: "#",
    },
    {
      title: "Anime Application",
      description:
        "Collaborative task management application with real-time updates using Socket.io and React. Includes drag-and-drop functionality.",
      tech: ["React", "Socket.io", "Node.js", "PostgreSQL"],
      image: "/anime.png",
      demo: "#",
      github: "#",
    },
    {
      title: "Twitter Application",
      description:
        "Analytics dashboard for social media management with data visualization and automated reporting features.",
      tech: ["React", "GraphQL", "Node.js", "MongoDB", "Chart.js"],
      image: "/twitter.png",
      demo: "#",
      github: "#",
    },
    {
      title: "Weather App",
      description:
        "Modern weather application with location-based forecasts, interactive maps, and responsive design.",
      tech: ["React", "REST API", "CSS3", "JavaScript"],
      image: "/weather.png",
      demo: "#",
      github: "#",
    },
  ];

  const skills = [
    { name: "JavaScript", level: 95 },
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "Express", level: 85 },
    { name: "Github", level: 75 },
    { name: "Redux", level: 70 },
    { name: "REST APIs", level: 90 },
  ];

  const navItems = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ];

  // Show loading state until theme is mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-teal-500 dark:text-teal-400"
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors hover:text-teal-500 dark:hover:text-teal-400 ${
                  activeSection === item.id
                    ? "text-teal-500 dark:text-teal-400"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-teal-500/10 dark:hover:bg-teal-400/10 transition-colors"
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left py-2 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 dark:from-teal-500/10 dark:to-blue-500/10" />
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-4 text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-teal-500 dark:border-teal-400">
              <Image
                src="/nik.jpg"
                alt="Professional headshot"
                className="w-full h-full object-cover"
                height={200}
                width={200}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-teal-500 dark:text-teal-400">Naitik</span>{" "}
              Koladiya
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              MERN Stack Developer | Problem Solver
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Passionate about building scalable, performant web applications
              that solve real-world problems and deliver exceptional user
              experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-600 text-white"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-teal-500 text-teal-500 hover:bg-teal-500/10 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400/10"
            >
              Contact Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ArrowDown className="h-6 w-6 animate-bounce text-teal-500 dark:text-teal-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              About <span className="text-teal-500 dark:text-teal-400">Me</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  I’m a passionate MERN stack developer with a strong interest
                  in building modern, responsive web applications. I enjoy
                  turning ideas into functional, clean, and user-friendly
                  digital experiences.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Currently focused on improving my skills in React, Node.js,
                  and MongoDB by working on personal projects and exploring new
                  web technologies. I'm eager to contribute to collaborative
                  projects, learn from experienced developers, and grow within
                  the dynamic world of web development.
                </p>
                <a href="/Naitik-Koladiya.pdf" download>
                  <Button className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-600 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </a>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">
                  Core Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "React",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "REST APIs",
                    "Git",
                    "GitHub",
                    "Next JS",
                    "Tailwind CSS",
                    "Bootstrap",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-teal-500/10 text-teal-600 border-teal-500/20 dark:bg-teal-400/10 dark:text-teal-400 dark:border-teal-400/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Featured{" "}
              <span className="text-teal-500 dark:text-teal-400">Projects</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group hover:shadow-xl h-[500px] transition-all duration-300 border-muted hover:border-teal-500/50 dark:hover:border-teal-400/50">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project?.image || "/nik.jpg"}
                        alt={project.title}
                        height={200}
                        width={200}
                        className="object-cover w-full h-80 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" variant="secondary" asChild>
                          <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="secondary" asChild>
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="min-h-[50px]">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Technical{" "}
              <span className="text-teal-500 dark:text-teal-400">Skills</span>
            </h2>

            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-teal-500 dark:text-teal-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Get In{" "}
              <span className="text-teal-500 dark:text-teal-400">Touch</span>
            </h2>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  Let's work together
                </h3>
                <p className="text-muted-foreground mb-8">
                  I'm always interested in new opportunities and exciting
                  projects. Whether you have a question or just want to say hi,
                  feel free to reach out!
                </p>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:bg-teal-500/10 hover:border-teal-500 dark:hover:bg-teal-400/10 dark:hover:border-teal-400"
                  >
                    <Link
                      href="https://github.com/Naitik-oo7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:bg-teal-500/10 hover:border-teal-500 dark:hover:bg-teal-400/10 dark:hover:border-teal-400"
                  >
                    <Link
                      href="www.linkedin.com/in/naitik-koladiya-15a33b236"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:bg-teal-500/10 hover:border-teal-500 dark:hover:bg-teal-400/10 dark:hover:border-teal-400"
                  >
                    <Link
                      href="https://x.com/KoladiyaNaitik"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:bg-teal-500/10 hover:border-teal-500 dark:hover:bg-teal-400/10 dark:hover:border-teal-400"
                  >
                    <Link href="mailto:naitik.koladiya@gmail.com">
                      <Mail className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Send me a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={formErrors.name ? "border-red-500" : ""}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Textarea
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={formErrors.message ? "border-red-500" : ""}
                      />
                      {formErrors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-600 text-white"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Naitik Koladiya. All rights reserved. Built with Next.js and
            Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
