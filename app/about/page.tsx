"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Target, Lightbulb, Search, Phone, Mail, MapPin, ShieldCheck } from "lucide-react"
import { useState, useMemo } from "react"

// Private team data - only shown when searched
const TEAM_DATA = [
  {
    id: 1,
    name: "Pradeep Swami",
    city: "Jaipur",
    region: "north",
    phone: "+91 97854-50390",
    email: "pradeep.glowcasapvtltd@gmail.com",
    description: "Covering North Jaipur region",
    initials: "PS"
  },
  {
    id: 2,
    name: "Dilip Kumar Dubay",
    city: "Indore",
    region: "west",
    phone: "+91 98278-35420",
    email: "dilip.glowcasapvtltd@gmail.com",
    description: "Coordinator for Indore and surrounding areas",
    initials: "DD"
  },
  {
    id: 3,
    name: "Rajendra Kumawat",
    city: "Jaipur",
    region: "south",
    phone: "+91 97821-61007",
    email: "rajendra.glowcasapvtltd@gmail.com",
    description: "Manages for South Jaipur region",
    initials: "RK"
  },
  {
    id: 4,
    name: "Vijay Kumar",
    city: "Kota",
    region: "central",
    phone: "+91 70148-85996",
    email: "vijay.glowcasapvtltd@gmail.com",
    description: "Kota district",
    initials: "VK"
  },
  {
    id: 5,
    name: "Akash Singh",
    city: "Sikar",
    region: "central",
    phone: "+91 96944-07645",
    email: "akashsingh.glowcasapvtltd@gmail.com",
    description: "Sikar region",
    initials: "AS"
  },
  {
    id: 6,
    name: "Akash Khushwah",
    city: "Gwalior",
    region: "central",
    phone: "+91 74158-97485",
    email: "akash.glowcasapvtltd@gmail.com",
    description: " Gwalior",
    initials: "AK"
  },
  {
    id: 7,
    name: "Budhrao Dhote",
    city: "Indore",
    region: "central",
    phone: "+91 98268-95296",
    email: "bhudraoglowcasapvtltd@gmail.com",
    description: "Indore region",
    initials: "BD"
  },
  {
    id: 8,
    name: "Vishav Batheja",
    city: "Sri Ganganagar",
    region: "corporate",
    phone: "+91 93517-78849",
    email: "vishav.glowcasapvtltd@gmail.com",
    description: "_ ",
    initials: "VB"
  },
  {
    id: 9,
    name: "Mayank Sharma",
    city: "Alwar",
    region: "central",
    phone: "+91 97854-86561",
    email: "mayank.glowcasapvtltd@gmail.com",
    description: "Manages for Alwar district area",
    initials: "MS"
  }
];

export default function AboutPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const filteredTeam = useMemo(() => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return [];
    }

    setHasSearched(true);
    const search = searchTerm.toLowerCase().trim();
    
    return TEAM_DATA.filter(member => {
      return (
        member.name.toLowerCase().includes(search) ||
        member.city.toLowerCase().includes(search) ||
        member.region.toLowerCase().includes(search)
      );
    });
  }, [searchTerm]);

  const handleSearch = (value:any) => {
    setSearchTerm(value);
    if (value.trim().length < 2) {
      setHasSearched(false);
    }
  };

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
            <h1 className="text-4xl font-bold text-balance lg:text-5xl">Brighter And Affordable Lighting</h1>
            <p className="text-xl text-muted-foreground text-pretty">We are a modern lighting solutions company dedicated to transforming ordinary spaces into bright, beautiful, and energy-efficient environments. 
             From homes to offices, showrooms, retail stores, and industrial units, GlowCasa delivers lighting that enhances mood, performance, and design aesthetics.With a passion for quality and an eye for detail, we offer a complete range of LED lighting products—panel lights, downlights, COBs, track lights, strip and rope lights, profile lighting, outdoor solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-5">500+</div>
              <div className="text-sm text-muted-foreground">Dealer Distributer Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Sales Team Section - NEW SECTION ADDED HERE */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <Badge variant="secondary" className="w-fit mx-auto">
                <ShieldCheck className="w-4 h-4 mr-2 inline" />
                Find Your Regional Contact
              </Badge>
              <h2 className="text-3xl font-bold text-balance">Connect With Our Sales Team</h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Search by city name or team member name to find your nearest Area Sales Manager or regional coordinator.
              </p>
            </div>

            {/* Search Input */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by city (e.g., Jaipur, Indore, Kota) or person name..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 rounded-lg focus:border-primary focus:outline-none transition-colors bg-background"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Enter at least 2 characters to search
                </p>
              </CardContent>
            </Card>

            {/* Empty State */}
            {!hasSearched && searchTerm.length === 0 && (
              <Card className="text-center py-12 border-dashed">
                <CardContent>
                  <MapPin className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <CardTitle className="mb-2">Search for Your Area Representative</CardTitle>
                  <CardDescription className="max-w-md mx-auto">
                    Enter your city name or team member name above to find contact details for your regional sales representative.
                  </CardDescription>
                </CardContent>
              </Card>
            )}

            {/* No Results */}
            {hasSearched && searchTerm.length >= 2 && filteredTeam.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <CardTitle className="mb-2">No Results Found</CardTitle>
                  <CardDescription className="mb-6 max-w-md mx-auto">
                    We couldn't find any team members for "{searchTerm}". Please try:
                  </CardDescription>
                  <ul className="text-sm text-muted-foreground space-y-2 max-w-md mx-auto text-left bg-muted/50 rounded-lg p-4">
                    <li>• Check your spelling</li>
                    <li>• Try searching for nearby cities (Jaipur, Indore, Kota, Sikar, Gwalior, Alwar, Sri Ganganagar)</li>
                    <li>• Search with a different team member name</li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {filteredTeam.length > 0 && (
              <>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground text-center">
                    Found <span className="font-semibold text-primary">{filteredTeam.length}</span> team {filteredTeam.length === 1 ? 'member' : 'members'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTeam.map(member => (
                    <Card key={member.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-linear-to-br from-primary/80 to-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                            {member.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-xl mb-1">{member.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {member.city}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {member.description}
                        </p>

                        <div className="space-y-3 pt-2 border-t">
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="font-medium">{member.phone}</span>
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            <span className="text-xs break-all">{member.email}</span>
                          </a>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <a
                            href={`tel:${member.phone}`}
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 px-4 rounded-lg font-semibold text-center transition-colors text-sm"
                          >
                            Call Now
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className="flex-1 bg-background hover:bg-muted border-2 border-primary text-primary py-2.5 px-4 rounded-lg font-semibold text-center transition-colors text-sm"
                          >
                            Email
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
                description: "We believe that light is more than just illumination — it's a symbol of hope, energy, and progress. Our journey has been guided by a single vision: to bring quality, innovation, and elegance into every space we brighten. From humble beginnings to becoming a trusted name in the lighting industry, our growth has been driven by passion, integrity, and the trust of our valued partners and customers. Every product we design reflects our commitment to excellence, sustainability, and modern aesthetics.",
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