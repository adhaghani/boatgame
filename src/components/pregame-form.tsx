import { useGameState } from "@/context/gameStateContext";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import type { Difficulty } from "@/types";
import { useNavigate } from "react-router-dom";
import { SelectGroup } from "@radix-ui/react-select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generatePuzzle } from "@/puzzle";
import { toast } from "sonner";
const formSchema = z.object({
  username: z.string().min(5).max(50),
  difficulty: z.string()
});

const PreGameForm = () => {
  const { gameState, updateState } = useGameState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      difficulty: "easy"
    }
  });

  const Navigate = useNavigate();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.username.length < 5) {
      toast.error("Username must be at least 5 characters");
      return;
    }
    const Puzzle = generatePuzzle(values.difficulty as Difficulty);
    updateState({
      ...gameState,
      username: values.username,
      difficulty: values.difficulty as Difficulty,
      startTime: new Date().toISOString(),
      gameStatus: "in_progress",
      userAnswer: [
        {
          position: 1,
          nationality: "",
          departureTime: "",
          cargo: "",
          chimneyColor: "",
          destination: ""
        },
        {
          position: 2,
          nationality: "",
          departureTime: "",
          cargo: "",
          chimneyColor: "",
          destination: ""
        },
        {
          position: 3,
          nationality: "",
          departureTime: "",
          cargo: "",
          chimneyColor: "",
          destination: ""
        },
        {
          position: 4,
          nationality: "",
          departureTime: "",
          cargo: "",
          chimneyColor: "",
          destination: ""
        },
        {
          position: 5,
          nationality: "",
          departureTime: "",
          cargo: "",
          chimneyColor: "",
          destination: ""
        }
      ],
      solution: Puzzle.solution,
      clues: Puzzle.clues
    });
    Navigate("/play");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Play Now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your details</DialogTitle>
          <DialogDescription>
            Before you play, let us know a little about you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormLabel>Difficulty</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Difficulty</SelectLabel>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>

          <Button onClick={() => onSubmit(form.getValues())}>Play Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreGameForm;
