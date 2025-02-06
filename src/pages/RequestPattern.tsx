
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  student1: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  student2: z.string().optional(),
  selectedPattern: z.string().optional(),
  customPattern: z.string().optional(),
}).refine(data => {
  return (data.selectedPattern && !data.customPattern) || (!data.selectedPattern && data.customPattern);
}, {
  message: "Veuillez soit choisir un pattern existant, soit proposer un nouveau pattern.",
  path: ["selectedPattern"],
});

const RequestPattern = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [requestType, setRequestType] = useState<"existing" | "new">("existing");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student1: "",
      student2: "",
      selectedPattern: "",
      customPattern: "",
    },
  });

  const availablePatterns = [
    "Factory",
    "Abstract Factory",
    "Builder",
    "Prototype",
    "Adapter",
    "Bridge",
    "Composite",
    "Decorator",
    "Facade",
    "Flyweight",
    "Observer",
    "State",
    "Command",
    "Iterator",
    "Chain of Responsibility",
    "Interpreter",
    "Mediator",
    "Memento",
    "Template Method",
    "Visitor",
  ].filter(pattern => !["Proxy", "Strategy"].includes(pattern));

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Demande envoyée !",
      description: "Votre demande a été envoyée avec succès à l'administrateur.",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-heading font-semibold">
            Demande de Design Pattern
          </h1>
          <p className="text-sm text-muted-foreground">
            Remplissez ce formulaire pour demander un pattern. Maximum 2 étudiants par groupe.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="student1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Étudiant 1 *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom complet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="student2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Étudiant 2 (optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom complet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Tabs value={requestType} onValueChange={(value: "existing" | "new") => setRequestType(value)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existing">Pattern Existant</TabsTrigger>
                <TabsTrigger value="new">Nouveau Pattern</TabsTrigger>
              </TabsList>
              <TabsContent value="existing">
                <FormField
                  control={form.control}
                  name="selectedPattern"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choisir un pattern</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un pattern" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availablePatterns.map((pattern) => (
                            <SelectItem key={pattern} value={pattern}>
                              {pattern}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="new">
                <FormField
                  control={form.control}
                  name="customPattern"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proposer un nouveau pattern</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nom du nouveau pattern"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Button type="submit" className="w-full">
              Envoyer la demande
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RequestPattern;
