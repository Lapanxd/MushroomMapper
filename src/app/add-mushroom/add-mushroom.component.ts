import { Component, OnInit } from '@angular/core';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MushroomService } from '../services/mushroom.service';
import { IMushroom } from '../models/mushroom';

@Component({
  selector: 'app-add-mushroom',
  templateUrl: './add-mushroom.component.html',
  styleUrls: ['./add-mushroom.component.scss']
})
export class AddMushroomComponent implements OnInit {

  faTimes = faTimes;
  faPlus = faPlus;

  display: boolean = true;
  mushrooms!: IMushroom[];
  selectedMushroomId: string = "";
  selectedMushroom: IMushroom = {_id: "", name: "", description: "", image: ""};

  constructor(private mushroomService: MushroomService) { }

  ngOnInit(): void {
    this.mushroomService.findAll().subscribe({
      next: (mushrooms) => {
        this.mushrooms = mushrooms;
      }
    });
  }

  close(){
    this.display = false;
  }

  updateMushroom(){
    this.selectedMushroom = this.mushrooms.find(mushroom => mushroom._id === this.selectedMushroomId)!;
  }
}
