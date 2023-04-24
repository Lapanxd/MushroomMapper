import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MushroomService } from '../services/mushroom.service';
import { IMushroom } from '../models/mushroom';
import { IGeoPoint } from '../models/geo-point';
import { GeoPointService } from '../services/geo-point.service';

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
  @Output() newPointAdded = new EventEmitter<IGeoPoint>();

  @Input() newPoint!: IGeoPoint;

  constructor(private mushroomService: MushroomService,
              private geoPointService: GeoPointService) { }

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

  addMushroom(){
    let newMushroom = {
      mushroomName: this.selectedMushroom.name,
      lat: this.newPoint.location.coordinates[0],
      long: this.newPoint.location.coordinates[1],
    }
    this.geoPointService.create(newMushroom).subscribe(mushroom => {
      if(mushroom.insertedId != ""){
        this.display = false;
        this.newPointAdded.emit(this.newPoint);
      } else {
        console.log("Erreur")
      }
    });
  }
}
