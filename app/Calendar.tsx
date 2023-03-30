import MainView from "components/calendars/main_view";
import { Container } from "components/Container";

export default function Calendar() {
  return (
    <Container className="mt-12">
      <div className="max-w-3xl">
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
          Calendar
        </h3>
        <MainView />
      </div>
    </Container>
  );
}
