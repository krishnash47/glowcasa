import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Target, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge variant="secondary" className="w-fit mx-auto">
              About glowcasa
            </Badge>
            <h1 className="text-4xl font-bold text-balance lg:text-5xl">Illuminating the Future with Innovation</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              For over 15 years, we've been at the forefront of lighting technology, delivering energy-efficient
              solutions that transform spaces and reduce environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  To provide innovative, energy-efficient lighting solutions that enhance the quality of life while
                  reducing environmental impact. We strive to make advanced lighting technology accessible to everyone,
                  from homeowners to large enterprises.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  To be the global leader in smart lighting solutions, pioneering technologies that create sustainable,
                  intelligent environments. We envision a world where lighting adapts seamlessly to human needs while
                  preserving our planet's resources.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-balance">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Our dedicated professionals bring decades of experience in lighting design and technology.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Abhishek Sharma",
                role: "Managing Director & Chairman",
                image: "https://res.cloudinary.com/dzdyydnkj/image/upload/v1763017567/abhi_sir_tbwkuk.png",
                description: "At Glowcasa Lighting, our mission is to illuminate lives through innovation, reliability, and trust.We believe lighting is not just about brightness, but about enhancing spaces and inspiring people.With a commitment to quality and integrity, we continue to deliver solutions that set new benchmarks.I thank our partners and team for their unwavering support — together, we will keep glowing brighter.",
              },
              {
                name: "Anuradha Sharma",
                role: "Director",
                image: "https://res.cloudinary.com/dzdyydnkj/image/upload/v1763021173/anmam_1_kum3f7.jpg",
                description: "We believe that light is more than just illumination — it’s a symbol of hope, energy, and progress. Our journey has been guided by a single vision: to bring quality, innovation, and elegance into every space we brighten. From humble beginnings to becoming a trusted name in the lighting industry, our growth has been driven by passion, integrity, and the trust of our valued partners and customers. Every product we design reflects our commitment to excellence, sustainability, and modern aesthetics.",
              },
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="relative h-48 w-48 mx-auto mb-4 overflow-hidden rounded-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
