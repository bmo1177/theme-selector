
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Info } from "lucide-react";

interface Student {
  name: string;
}

interface PatternCardProps {
  name: string;
  students: Student[];
  date?: string;
  status: "available" | "assigned" | "pending";
}

const patternDefinitions: Record<string, { description: string, example: string }> = {
  "Factory": {
    description: "Un patron de conception qui fournit une interface pour créer des objets dans une super-classe, tout en permettant aux sous-classes de modifier le type d'objets créés.",
    example: "Création de documents dans une application (PDF, Word, etc.)"
  },
  "Abstract Factory": {
    description: "Fournit une interface pour créer des familles d'objets liés ou dépendants sans spécifier leurs classes concrètes.",
    example: "Création de composants d'interface utilisateur pour différents systèmes d'exploitation"
  },
  "Builder": {
    description: "Permet de construire des objets complexes étape par étape, en utilisant le même code de construction.",
    example: "Construction de différents types de maisons (maison standard, chalet, villa)"
  },
  "Prototype": {
    description: "Permet de copier des objets existants sans rendre le code dépendant de leurs classes.",
    example: "Copie de formes géométriques dans un éditeur graphique"
  },
  "Adapter": {
    description: "Permet la collaboration entre des objets ayant des interfaces incompatibles.",
    example: "Adaptation d'un format de données XML vers JSON"
  },
  "Bridge": {
    description: "Permet de diviser une classe ou un ensemble de classes en deux hiérarchies : abstraction et implémentation.",
    example: "Différents types de télécommandes pour différents appareils"
  },
  "Composite": {
    description: "Permet de composer des objets en structures arborescentes pour traiter ces structures de manière uniforme.",
    example: "Gestion des dossiers et fichiers dans un système de fichiers"
  },
  "Decorator": {
    description: "Permet d'ajouter dynamiquement des comportements à des objets en les plaçant dans des objets enveloppe.",
    example: "Ajout de fonctionnalités à une boisson (café avec lait, sucre, etc.)"
  },
  "Facade": {
    description: "Fournit une interface simplifiée à une bibliothèque, un framework ou un ensemble complexe de classes.",
    example: "Interface simplifiée pour un système de home cinéma"
  },
  "Flyweight": {
    description: "Permet de réduire l'utilisation de la mémoire en partageant efficacement des données communes entre plusieurs objets.",
    example: "Rendu de milliers d'arbres dans un jeu vidéo"
  },
  "Proxy": {
    description: "Fournit un substitut pour contrôler l'accès à un autre objet.",
    example: "Chargement différé d'images dans une page web"
  },
  "Observer": {
    description: "Définit un mécanisme de souscription pour notifier plusieurs objets des changements d'un objet observé.",
    example: "Mise à jour automatique des éléments d'interface utilisateur"
  },
  "Strategy": {
    description: "Permet de définir une famille d'algorithmes, de les encapsuler et de les rendre interchangeables.",
    example: "Différentes stratégies de paiement dans une boutique en ligne"
  },
  "State": {
    description: "Permet à un objet de modifier son comportement quand son état interne change.",
    example: "États d'un lecteur multimédia (lecture, pause, arrêt)"
  },
  "Command": {
    description: "Transforme une requête en objet autonome contenant toutes les informations sur la requête.",
    example: "Implémentation de fonctions annuler/rétablir dans un éditeur"
  },
  "Iterator": {
    description: "Permet de parcourir les éléments d'une collection sans exposer sa représentation interne.",
    example: "Parcours des éléments d'une playlist musicale"
  },
  "Chain of Responsibility": {
    description: "Permet de faire passer des requêtes le long d'une chaîne de handlers.",
    example: "Traitement des demandes de support technique à différents niveaux"
  },
  "Interpreter": {
    description: "Définit une grammaire pour un langage et fournit un interpréteur pour interpréter ses phrases.",
    example: "Interprétation d'expressions mathématiques simples"
  },
  "Mediator": {
    description: "Réduit les dépendances chaotiques entre les objets en les forçant à communiquer via un objet médiateur.",
    example: "Contrôle du trafic aérien"
  },
  "Memento": {
    description: "Permet de sauvegarder et restaurer l'état précédent d'un objet sans révéler les détails de son implémentation.",
    example: "Système de sauvegarde dans un éditeur de texte"
  },
  "Template Method": {
    description: "Définit le squelette d'un algorithme dans une méthode, en déléguant certaines étapes aux sous-classes.",
    example: "Préparation de différentes boissons (café, thé)"
  },
  "Visitor": {
    description: "Permet de séparer les algorithmes des objets sur lesquels ils opèrent.",
    example: "Export de documents dans différents formats"
  },
  "Model-View Template": {
    description: "Une variation du MVC adaptée pour le web, séparant la logique, les données et la présentation.",
    example: "Framework Django pour le développement web"
  },
  "MVC": {
    description: "Sépare une application en trois composants principaux : Modèle, Vue et Contrôleur.",
    example: "Application de gestion des tâches avec interface utilisateur"
  },
  "Commit-Reveal Scheme": {
    description: "Un protocole en deux phases où les participants s'engagent d'abord sur une valeur, puis la révèlent.",
    example: "Système de vote électronique sécurisé"
  },
  "Null-Object": {
    description: "Fournit un objet par défaut au lieu d'utiliser une référence null.",
    example: "Utilisateur invité dans une application"
  }
};

const PatternCard = ({ name, students, date, status }: PatternCardProps) => {
  const definition = patternDefinitions[name];

  return (
    <Card className="pattern-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-heading">
            {name}
            {definition && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Info className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{name}</SheetTitle>
                    <SheetDescription className="text-left space-y-4">
                      <div className="border-l-2 border-primary pl-4 py-2 my-4">
                        <p className="text-sm">{definition.description}</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <strong className="block mb-2">Exemple Concret:</strong>
                        <p className="text-sm text-muted-foreground">{definition.example}</p>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            )}
          </CardTitle>
          <span className={`status-badge ${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {students.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">Étudiants assignés :</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {students.map((student, index) => (
                <li key={index}>{student.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Aucun étudiant assigné</p>
        )}
        {date && (
          <p className="text-sm text-muted-foreground mt-2">
            Date de présentation : {date}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {status === "available" ? (
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link to="/request">Demander ce pattern</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            disabled
          >
            {status === "assigned" ? "Pattern attribué" : "Demande en cours"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PatternCard;
