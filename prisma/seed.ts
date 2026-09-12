import { PrismaClient, ApplicationStatus, WorkMode } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.application.createMany({
    data: [
      {
        companyName: "Northwind Labs",
        jobTitle: "Frontend Engineer",
        url: "https://example.com/jobs/frontend-engineer",
        salary: "€70,000 - €85,000",
        location: "Berlin",
        workMode: WorkMode.HYBRID,
        status: ApplicationStatus.INTERVIEWING,
        contactName: "Lea Fischer",
        contactEmail: "lea.fischer@example.com",
        notes: "Technical interview scheduled for next week.",
      },
      {
        companyName: "Acme Digital",
        jobTitle: "Product Designer",
        url: "https://example.com/jobs/product-designer",
        salary: "€60,000 - €72,000",
        location: "Munich",
        workMode: WorkMode.ON_SITE,
        status: ApplicationStatus.APPLIED,
        notes: "Application submitted through the company portal.",
      },
      {
        companyName: "Cloud Harbor",
        jobTitle: "Senior Software Engineer",
        location: "Remote",
        workMode: WorkMode.REMOTE,
        status: ApplicationStatus.OFFERED,
        contactName: "Jonas Weber",
        contactEmail: "jonas.weber@example.com",
        notes: "Offer received; reviewing compensation package.",
      },
    ],
  });

  await prisma.globalSettings.create({
    data: { stalledThresholdDays: 14 },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
