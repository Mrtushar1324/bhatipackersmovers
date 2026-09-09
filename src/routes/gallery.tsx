import { createFileRoute } from "@tanstack/react-router";
import Gallery from "@/components/site/Gallery";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
});
