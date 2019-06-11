using System.Collections.Generic;

namespace DVDMovieStore.Models
{
    public class Movie
    {
        public long MovieId{get;set;}
        public string Name {get;set;}
        public string Category {get;set;}
        public string Description{get;set;}
        public decimal Price {get;set;}

        public Studio Studio {get;set;}
        public List<Rating> Ratings{get;set;}
    }
}