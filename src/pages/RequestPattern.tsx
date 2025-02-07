
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
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
import { supabase } from "@/integrations/supabase/client";

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

  // Fetch existing patterns and their requests
  const { data: patternsData } = useQuery({
    queryKey: ['patterns'],
    queryFn: async () => {
      const { data: patterns } = await supabase
        .from('patterns')
        .select('*');
      return patterns || [];
    },
  });

  const { data: requestsData } = useQuery({
    queryKey: ['pattern_requests'],
    queryFn: async () => {
      const { data: requests } = await supabase
        .from('pattern_requests')
        .select('*')
        .eq('status', 'pending');
      return requests || [];
    },
  });

  // Filter available patterns based on existing requests
  const availablePatterns = patternsData?.filter(pattern => {
    if (pattern.status !== 'available') return false;
    
    // Count pending requests for this pattern
    const pendingRequests = requestsData?.filter(
      request => request.pattern_name === pattern.name
    ).length || 0;
    
    // Allow if there are less than 2 pending requests
    return pendingRequests < 2;
  }).map(pattern => pattern.name) || [];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const patternName = values.selectedPattern || values.customPattern;
      if (!patternName) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Veuillez sélectionner ou proposer un pattern.",
        });
        return;
      }

      const { error } = await supabase
        .from('pattern_requests')
        .insert({
          pattern_name: patternName,
          student1_name: values.student1,
          student2_name: values.student2 || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: "Votre demande a été envoyée avec succès à l'administrateur.",
      });
      
      navigate("/");
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de la demande.",
      });
    }
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
