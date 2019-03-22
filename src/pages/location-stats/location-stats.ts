import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { WildlifeProvider } from '../../providers/wildlife/wildlife';
import { CreatureListDetailPage } from '../creature-list-detail/creature-list-detail';

/**
 * Generated class for the LocationStatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-stats',
  templateUrl: 'location-stats.html',
})
export class LocationStatsPage {

  locationStats;
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';
  public doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {position: 'bottom'}
  };

  showChart = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public wildlifeProvider: WildlifeProvider, public modalCtrl: ModalController,
    public loadingController: LoadingController) {

      this.locationStats = navParams.get('locationStats');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationStatsPage');

    this.createData();
  }

  

  createData(){
    this.locationStats.creatures.forEach(row => {
      this.doughnutChartData.push(row.total);
      this.doughnutChartLabels.push(row.name);
    });
    this.showChart = true;
  }

  viewCreature(creature, e){
    e.stopPropagation();
    this.navCtrl.push(CreatureListDetailPage, {
      creature: creature
    });
  }

}
